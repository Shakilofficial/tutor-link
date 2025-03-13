/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import mongoose, { ClientSession } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/appError';
import { EmailHelper } from '../../utils/emailHelpers';
import { generateOtp } from '../../utils/generateOtp';
import { UserRole } from '../user/user.interface';
import { User } from '../user/user.model';
import { IAuth, IJwtPayload } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.isUserExistsByEmail(payload.email);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    if (user.isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as string,
      name: user.name as string,
      email: user.email as string,
      profileImage: user.profileImage as string,
      isDeleted: user.isDeleted ?? false,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err: any) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.isDeleted === true) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is deleted');
  }

  const jwtPayload: IJwtPayload = {
    userId: isUserExist._id as string,
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    profileImage: isUserExist.profileImage as string,
    isDeleted: isUserExist.isDeleted ?? false,
    role: isUserExist.role as UserRole,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { userId } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({ _id: userId }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Validate old password
  const isOldPasswordCorrect = await User.isPasswordMatched(
    oldPassword,
    user.password,
  );
  if (!isOldPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Incorrect old password');
  }

  // Ensure newPassword is a string and bcrypt_salt_rounds is a valid number
  const saltRounds = Number(config.bcrypt_salt_rounds);
  if (isNaN(saltRounds)) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Invalid salt rounds configuration',
    );
  }

  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await User.updateOne({ _id: userId }, { password: hashedPassword });

  return { message: 'Password changed successfully' };
};

const forgotPassword = async ({ email }: { email: string }) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is deleted!');
  }

  const otp = generateOtp();
  const otpToken = jwt.sign({ otp, email }, config.jwt_otp_secret as string, {
    expiresIn: '15m',
  });

  await User.updateOne({ email }, { otpToken });

  try {
    const emailContent = await EmailHelper.createEmailContent(
      { otpCode: otp, userName: user.name },
      'forgotPassword',
    );

    await EmailHelper.sendEmail(email, emailContent, 'Reset Password OTP');
  } catch (error: any) {
    await User.updateOne({ email }, { $unset: { otpToken: 1 } });

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to send OTP email: ${error.message}`,
    );
  }
};

const verifyOTP = async ({ email, otp }: { email: string; otp: string }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!user.otpToken) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'No OTP token found. Please request a new password reset OTP.',
    );
  }

  let decodedOtpData;
  try {
    decodedOtpData = verifyToken(
      user.otpToken,
      config.jwt_otp_secret as string,
    );
  } catch (error) {
    throw new AppError(StatusCodes.FORBIDDEN, 'OTP has expired or is invalid');
  }

  if (!decodedOtpData?.otp || typeof decodedOtpData.otp !== 'string') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid OTP data');
  }

  if (decodedOtpData.otp !== otp) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid OTP');
  }

  // Clear OTP token after successful verification
  user.otpToken = null;
  await user.save();

  // Validate environment configuration
  if (!config.jwt_pass_reset_secret) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Password reset secret is not configured.',
    );
  }

  const expiresIn = config.jwt_pass_reset_expires_in || '1h';

  // Generate password reset token
  let resetToken;
  try {
    resetToken = jwt.sign({ email }, config.jwt_pass_reset_secret, {
      expiresIn,
    } as SignOptions);
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to generate password reset token',
    );
  }

  return { resetToken };
};

const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  const session: ClientSession = await User.startSession();

  try {
    session.startTransaction();

    const decodedData = verifyToken(
      token as string,
      config.jwt_pass_reset_secret as string,
    );

    const user = await User.findOne({
      email: decodedData.email,
      isDeleted: false,
    }).session(session);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(
      String(newPassword),
      Number(config.bcrypt_salt_rounds),
    );

    await User.updateOne(
      { email: user.email },
      { password: hashedPassword },
    ).session(session);

    await session.commitTransaction();

    return {
      message: 'Password changed successfully',
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
