import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';

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
  const result = await bookingServices.getMyBookings(req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Fetched bookings successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookings(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Fetched bookings successfully',
    meta: result.meta,
    data: result.bookings,
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
  acceptBooking,
  cancelBooking,
  getMyBookings,
  getAllBookings,
  makePayment,
};
