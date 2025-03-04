import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { generateTransactionId } from '../payment/payment.utils';
import { PaymentInitData, sslService } from '../sslcommerz/sslcommerz.service';
import { Student } from '../student/student.model';
import { Tutor } from '../tutor/tutor.model';
import { UserRole } from '../user/user.interface';
import { BookingStatus, IBooking, PaymentStatus } from './booking.interface';
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

const acceptBooking = async (
  user: JwtPayload,
  bookingId: string,
): Promise<IBooking> => {
  const tutor = await Tutor.findOne({ user: user.userId });
  if (!tutor)
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor profile not found');

  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId, tutor: tutor._id },
    {
      status: 'accepted',
    },
    { new: true },
  );
  if (!booking) throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');

  return booking;
};

const cancelBooking = async (user: JwtPayload, bookingId: string) => {
  const student = await Student.findOne({ user: user.userId });
  if (!student) throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');

  const booking = await Booking.findOne({
    _id: bookingId,
    student: student._id,
  });

  if (!booking) throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');

  booking.status = BookingStatus.CANCELLED;
  booking.paymentStatus = PaymentStatus.REFUNDED;

  await booking.save();
};

const getMyBookings = async (user: JwtPayload) => {
  const student = await Student.findOne({ user: user.userId });
  if (!student) throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  const booking = await Booking.find({
    student: student._id,
  });
  return booking;
};

const getAllBookings = async () => {
  const bookings = await Booking.find();
  return bookings;
};

const makePayment = async (bookingId: string, user: JwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const student = await Student.findOne({ user: user.userId })
      .populate('user')
      .session(session);

    if (!student || user.role !== UserRole.STUDENT) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
    }

    const booking = await Booking.findById(bookingId).session(session);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Booking must be accepted by the tutor before payment',
      );
    }

    // Generate a transaction ID
    const tran_id = generateTransactionId();
    // Update the Booking document with tran_id
    booking.tran_id = tran_id;
    await booking.save({ session });

    const paymentData: PaymentInitData = {
      amount: booking.amount,
      bookingId,
      studentId: student._id.toString(),
      transactionId: tran_id,
    };

    let result;

    if (booking.paymentMethod === 'online') {
      result = await sslService.initPayment(paymentData);
      result = { paymentUrl: result };
    } else {
      result = { message: 'Payment will be made in person' };
    }

    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new Error(`Payment initiation failed: ${(error as Error).message}`);
  } finally {
    session.endSession();
  }
};

export const bookingServices = {
  createBooking,
  acceptBooking,
  cancelBooking,
  getMyBookings,
  getAllBookings,
  makePayment,
};
