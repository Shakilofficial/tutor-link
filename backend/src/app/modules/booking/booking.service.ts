import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { generateTransactionId } from '../payment/payment.utils';
import { PaymentInitData, sslService } from '../sslcommerz/sslcommerz.service';
import { Student } from '../student/student.model';
import { Tutor } from '../tutor/tutor.model';
import { UserRole } from '../user/user.interface';
import { BookingStatus, IBooking, PaymentStatus } from './booking.interface';
import { Booking } from './booking.model';

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
  let filter: Record<string, unknown> = {};

  const student = await Student.findOne({ user: user.userId });
  if (student) {
    filter = { student: student._id };
  } else {
    const tutor = await Tutor.findOne({ user: user.userId });
    if (tutor) {
      filter = { tutor: tutor._id };
    } else {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'User not found as Student or Tutor',
      );
    }
  }

  const bookings = await Booking.find(filter)
    .populate([
      {
        path: 'student',
        populate: { path: 'user', select: 'name email ptofileImage' },
      },
      {
        path: 'tutor',
        populate: { path: 'user', select: 'name email profileImage' },
      },
      { path: 'subject', select: 'name' },
    ])
    .lean();

  return bookings;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find()
      .populate({ path: 'student', populate: { path: 'user' } })
      .populate({ path: 'tutor', populate: { path: 'user' } })
      .populate({ path: 'subject', select: 'name' }),
    query,
  )
    .search(['tran_id'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const bookings = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();
  return { bookings, meta };
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
  acceptBooking,
  cancelBooking,
  getMyBookings,
  getAllBookings,
  makePayment,
};
