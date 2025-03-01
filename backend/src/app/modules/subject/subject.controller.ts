import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subjectServices } from './subject.service';

const getAllSubjects = catchAsync(async (req, res) => {
  const result = await subjectServices.getAllSubjects();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All subjects fetched successfully',
    data: result,
  });
});

const getSingleSubject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await subjectServices.getSingleSubject(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single subject fetched successfully',
    data: result,
  });
});

const createSubject = catchAsync(async (req, res) => {
  const result = await subjectServices.createSubject(
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Subject created successfully',
    data: result,
  });
});

const updateSubject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await subjectServices.updateSubject(
    id,
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subject updated successfully',
    data: result,
  });
});

const deleteSubject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await subjectServices.deleteSubject(
    id,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subject deleted successfully',
    data: result,
  });
});

export const subjectControllers = {
  getAllSubjects,
  getSingleSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
