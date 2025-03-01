import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const profileImage = req.file as IImageFile;
  const result = await userServices.createStudent(
    req.body,
    req.body.student,
    profileImage,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const createTutor = catchAsync(async (req, res) => {
  const { name, email, password, ...tutorData } = req.body;
  const profileImage = req.file as IImageFile;

  const result = await userServices.createTutor(
    { name, email, password },
    tutorData,
    profileImage,
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Tutor created successfully',
    data: result,
  });
});

export const userControllers = { createStudent, createTutor };
