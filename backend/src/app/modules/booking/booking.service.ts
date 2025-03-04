/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { EmailHelper } from '../../utils/emailHelpers';
import { generateTransactionId } from '../payment/payment.utils';
import { sslService } from '../sslcommerz/sslcommerz.service';
import { Student } from '../student/student.model';
import { Tutor } from '../tutor/tutor.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (
  bookingData: Partial<IBooking>,
  user: JwtPayload,
  tutorId: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find student profile
    const student = await Student.findOne({ user: user.userId }).session(
      session,
    );
    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
    }

    // Find tutor
    const tutor = await Tutor.findById(tutorId)
      .session(session)
      .select('hourlyRate availability subjects')
      .populate('subjects');

    if (!tutor) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
    }

    // Validate subject
    const validSubject = tutor.subjects.some(
      (subject) => subject._id.toString() === bookingData.subject?.toString(),
    );
    if (!validSubject) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Tutor does not offer this subject',
      );
    }

    // Validate tutor availability
    const bookingDay = new Date(bookingData.startTime!).toLocaleDateString(
      'en-US',
      {
        weekday: 'long',
      },
    );

    const availableDay = tutor.availability.find((d) => d.day === bookingDay);
    if (!availableDay) {
      throw new AppError(
        StatusCodes.CONFLICT,
        'Tutor not available on this day',
      );
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      tutor: tutorId,
      startTime: { $lt: bookingData.endTime },
      endTime: { $gt: bookingData.startTime },
      status: { $nin: ['cancelled', 'failed'] },
    }).session(session);

    if (conflictingBooking) {
      throw new AppError(StatusCodes.CONFLICT, 'Time slot already booked');
    }

    // Calculate booking details
    const durationHours =
      (new Date(bookingData.endTime!).getTime() -
        new Date(bookingData.startTime!).getTime()) /
      (1000 * 60 * 60);

    const amount = tutor.hourlyRate * durationHours;

    // Create booking
    const booking = await Booking.create(
      [
        {
          student: student._id,
          tutor: tutorId,
          subject: bookingData.subject,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          durationHours,
          hourlyRate: tutor.hourlyRate,
          amount,
          paymentMethod: bookingData.paymentMethod,
          status: 'pending',
          paymentStatus: 'pending',
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return { booking: booking[0], paymentUrl: null };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const acceptBooking = async (user: JwtPayload, bookingId: string) => {
  const MAX_RETRIES = 3; 
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
  
      const tutor = await Tutor.findOne({ user: user.userId }).session(session);
      if (!tutor) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Tutor profile not found');
      }

      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId, tutor: tutor._id },
        { status: 'accepted' },
        { new: true, session },
      ).populate(['student', 'tutor', 'subject']);

      if (!booking) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');
      }


      const student = await Student.findById(booking.student)
        .populate('user')
        .session(session);

      if (!student) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
      }

      const studentId = student._id.toString();
      const transactionId = generateTransactionId();

      let paymentUrl = null;

      if (booking.paymentMethod === 'online') {

        await Booking.findByIdAndUpdate(
          bookingId,
          { transactionId, paymentStatus: 'pending' },
          { new: true, session },
        );

        await session.commitTransaction();
        session.endSession();


        paymentUrl = await sslService.initPayment({
          amount: booking.amount,
          bookingId: booking._id.toString(),
          studentId,
          transactionId,
        });


        if ((student as any)?.user?.email) {
          const emailContent = await EmailHelper.createEmailContent(
            {
              userName: (student as any).user.name,
              amount: booking.amount,
              tutorName: (booking.tutor as any).user.name,
              paymentUrl,
            },
            'paymentRequest',
          );

          await EmailHelper.sendEmail(
            (student as any).user.email,
            emailContent,
            'Payment Request for Tutoring Session',
          );
        }
      } else {

        await Booking.findByIdAndUpdate(
          bookingId,
          { status: 'confirmed', paymentStatus: 'paid' },
          { new: true, session },
        );

        const earnings = booking.amount * 0.8; 
        await Tutor.findByIdAndUpdate(
          tutor._id,
          { $inc: { earnings } },
          { new: true, session },
        );

        if ((student as any)?.user?.email) {
          const emailContent = await EmailHelper.createEmailContent(
            {
              userName: (student as any).user.name,
              tutorName: (booking.tutor as any).user.name,
              bookingDate: new Date(booking.startTime).toLocaleDateString(),
            },
            'bookingConfirmation',
          );

          await EmailHelper.sendEmail(
            (student as any).user.email,
            emailContent,
            'Booking Confirmation',
          );
        }

        await session.commitTransaction();
        session.endSession();
      }

      return booking;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      if (error.message.includes('Write conflict')) {
        attempt++;
        console.log(`Retrying transaction... Attempt ${attempt}`);
        if (attempt >= MAX_RETRIES) throw error;
      } else {
        throw error;
      }
    }
  }
};

export const bookingServices = {
  createBooking,
  acceptBooking,
};
