import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { IBooking } from '../booking/booking.interface';
import { Booking } from '../booking/booking.model';
import { Student } from '../student/student.model';
import { UserRole } from '../user/user.interface';
import { User } from '../user/user.model';
import { tutorSearchableFields } from './tutor.const';
import { ITutor } from './tutor.interface';
import { Tutor } from './tutor.model';

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

const getAllTutors = async (query: Record<string, unknown>) => {
  const tutorQuery = new QueryBuilder(
    Tutor.find().populate('user').populate('subjects'),
    query,
  )
    .search(tutorSearchableFields)
    .filter()
    .priceRange()
    .sort()
    .paginate()
    .fields();

  const tutors = await tutorQuery.modelQuery;
  const meta = await tutorQuery.countTotal();
  return { tutors, meta };
};

const getSingleTutor = async (id: string) => {
  const tutor = await Tutor.findById(id)
    .populate({
      path: 'user',
      select: 'name email profileImage',
    })
    .populate({
      path: 'subjects',
      select: 'name gradeLevel',
    })
    .lean();

  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }
  return tutor;
};

const myTutorProfile = async (user: JwtPayload) => {
  const isUserExist = await User.findById(user.userId);

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const tutor = await Tutor.findOne({ user: user.userId })
    .populate({
      path: 'user',
      select: 'name email profileImage',
    })
    .populate({
      path: 'subjects',
      select: 'name gradeLevel',
    })
    .lean();

  if (!tutor) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Access denied. You are not registered as a tutor.',
    );
  }

  return tutor;
};

const updateMyTutorProfile = async (
  user: JwtPayload,
  payload: Partial<ITutor>,
) => {
  const updatedTutor = await Tutor.findOneAndUpdate(
    { user: user.userId },
    payload,
    { new: true, runValidators: true },
  ).populate([
    { path: 'user', select: 'name email profileImage' },
    { path: 'subjects', select: 'name gradeLevel' },
  ]);

  if (!updatedTutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }

  return updatedTutor;
};

const deleteTutor = async (id: string, user: JwtPayload) => {
  const tutor = await Tutor.findById(id);

  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }

  // Authorization check
  if (user.role !== UserRole.ADMIN && tutor.user.toString() !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this tutor profile',
    );
  }

  const session = await Tutor.startSession();
  session.startTransaction();

  try {
    await Tutor.findByIdAndDelete(id).session(session);
    await User.findByIdAndDelete(tutor.user).session(session);
    await session.commitTransaction();
    return { message: 'Tutor profile deleted successfully' };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const tutorServices = {
  createBooking,
  getAllTutors,
  getSingleTutor,
  myTutorProfile,
  updateMyTutorProfile,
  deleteTutor,
};
