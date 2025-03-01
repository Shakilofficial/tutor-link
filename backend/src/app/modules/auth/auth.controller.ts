import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const result = await authServices.refreshToken(authorization as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;

  await authServices.changePassword(user, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password changed successfully!',
    data: null,
  });
});

// forgot password
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authServices.forgotPassword(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Check your email to reset your password',
    data: null,
  });
});

// reset password

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.verifyOTP(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'OTP verified successfully.',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authServices.resetPassword(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
