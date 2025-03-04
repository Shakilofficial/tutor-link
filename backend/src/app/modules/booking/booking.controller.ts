import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
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
  const { bookingId } = req.params;
  const { user } = req;

  const booking = await bookingServices.acceptBooking(
    user as JwtPayload,
    bookingId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking accepted successfully',
    data: booking,
  });
});

export const bookingControllers = {
  createBooking,
  acceptBooking,
};
