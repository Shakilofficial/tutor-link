import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from '../auth/auth.service';
import { userServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { location, ...userData } = req.body;
  const profileImage = req.file as IImageFile;

  const result = await userServices.createStudent(
    userData,
    { location },
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

const createTutor = catchAsync(async (req, res) => {
  const { name, email, password, ...tutorData } = req.body;
  const profileImage = req.file || undefined;

  const result = await userServices.createTutor(
    { name, email, password },
    tutorData,
    profileImage,
  );

  // Generate tokens
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
      tutor: {
        ...result.tutor.toObject(),
        totalEarnings: result.tutor?.totalEarnings,
      },
    },
  });
});

const myProfile = catchAsync(async (req, res) => {
  const user = await userServices.myProfile(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My profile fetched successfully',
    data: user,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const updatedUser = await userServices.updateProfile(
    req.user as JwtPayload,
    req.file as IImageFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await userServices.updateStatus(userId, req.user as JwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `User is now ${user.isDeleted ? 'deleted' : 'active'}`,
    data: user,
  });
});

const toggleUserVerify = catchAsync(async (req, res) => {
  const user = await userServices.toggleUserVerify(
    req.params.id,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `User is now ${user.isVerified ? 'verified' : 'unverified'}`,
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All users fetched successfully',
    meta: result.meta,
    data: result.users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single user fetched successfully',
    data: result,
  });
});
export const userControllers = {
  createStudent,
  createTutor,
  myProfile,
  updateProfile,
  updateStatus,
  getAllUsers,
  getSingleUser,
  toggleUserVerify,
};
