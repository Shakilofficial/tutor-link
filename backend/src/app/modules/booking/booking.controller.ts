import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const booking = await bookingServices.createBooking(
    req.body,
    req.user,
    req.params.tutorId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking request created successfully',
    data: booking,
  });
});

const acceptBooking = catchAsync(async (req, res) => {
  const booking = await bookingServices.acceptBooking(
    req.user,
    req.params.bookingId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking accepted successfully',
    data: booking,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  await bookingServices.cancelBooking(req.user, req.params.bookingId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking canceled successfully',
    data: null,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const bookings = await bookingServices.getMyBookings(req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Fetched bookings successfully',
    data: bookings,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await bookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Fetched bookings successfully',
    data: bookings,
  });
});

const makePayment = catchAsync(async (req, res) => {
  const result = await bookingServices.makePayment(
    req.params.bookingId,
    req.user,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment initiated successfully',
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  acceptBooking,
  cancelBooking,
  getMyBookings,
  getAllBookings,
  makePayment
};
