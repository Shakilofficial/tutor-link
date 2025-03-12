import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tutorServices } from './tutor.service';

const createBooking = catchAsync(async (req, res) => {
  const booking = await tutorServices.createBooking(
    req.body,
    req.user,
    req.params.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking request created successfully',
    data: booking,
  });
});

const getAllTutors = catchAsync(async (req, res) => {
  const result = await tutorServices.getAllTutors(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All tutors fetched successfully',
    meta: result.meta,
    data: result.tutors,
  });
});

const getSingleTutor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tutorServices.getSingleTutor(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single tutor fetched successfully',
    data: result,
  });
});

const myTutorProfile = catchAsync(async (req, res) => {
  const tutor = await tutorServices.myTutorProfile(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My profile fetched successfully',
    data: tutor,
  });
});

const updateMyTutorProfile = catchAsync(async (req, res) => {
  const tutor = await tutorServices.updateMyTutorProfile(
    req.user as JwtPayload,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My profile updated successfully',
    data: tutor,
  });
});

const deleteTutor = catchAsync(async (req, res) => {
  const { id } = req.params;
  await tutorServices.deleteTutor(id, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor deleted successfully',
    data: null,
  });
});

export const tutorControllers = {
  createBooking,
  getAllTutors,
  getSingleTutor,
  myTutorProfile,
  updateMyTutorProfile,
  deleteTutor,
};
