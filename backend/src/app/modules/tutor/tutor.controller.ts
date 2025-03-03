import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tutorServices } from './tutor.service';

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

const updateTutor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tutorServices.updateTutor(
    id,
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor updated successfully',
    data: result,
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
  getAllTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
};
