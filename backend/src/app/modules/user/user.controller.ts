import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from '../auth/auth.service';
import { userServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body;
  const profileImage = req.file as IImageFile;

  const result = await userServices.createStudent(
    userData,
    student,
    profileImage,
  );

  // Generate tokens after successful creation
  const { accessToken, refreshToken } = await authServices.loginUser({
    email: userData.email,
    password: userData.password,
  });

  // Set refreshToken in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Student created successfully',
    data: {
      accessToken,
      user: result.user,
      student: result.student,
    },
  });
});

// Tutor controller
const createTutor = catchAsync(async (req, res) => {
  const { name, email, password, ...tutorData } = req.body;
  const profileImage = req.file as IImageFile;

  const result = await userServices.createTutor(
    { name, email, password },
    tutorData,
    profileImage,
  );

  // Generate tokens after successful creation
  const { accessToken, refreshToken } = await authServices.loginUser({
    email,
    password,
  });

  // Set refreshToken in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Tutor created successfully',
    data: {
      accessToken,
      user: result.user,
      tutor: result.tutor,
    },
  });
});

export const userControllers = {
  createStudent,
  createTutor,
};
