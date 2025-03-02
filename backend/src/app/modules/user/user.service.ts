/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { IImageFile } from '../../interface/IImageFile';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { ITutor } from '../tutor/tutor.interface';
import { Tutor } from '../tutor/tutor.model';
import { userSearchableFields } from './user.const';
import { IUser, UserRole } from './user.interface';
import { User } from './user.model';

const createStudent = async (
  userData: Partial<IUser>,
  studentData: Partial<IStudent>,
  profileImage: IImageFile | null,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (profileImage) userData.profileImage = profileImage.path;
    userData.role = UserRole.STUDENT;

    const user = new User(userData);
    await user.save({ session });

    const student = new Student({ ...studentData, user: user._id });
    await student.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { user, student };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }
};

const createTutor = async (
  userData: Partial<IUser>,
  tutorData: Partial<ITutor> | undefined,
  profileImage: IImageFile | null,
) => {
  if (!tutorData) {
    throw new Error('Tutor data is missing from the request.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (profileImage) userData.profileImage = profileImage.path;
    userData.role = UserRole.TUTOR;

    const user = new User(userData);

    await user.save({ session });

    const tutor = new Tutor({
      user: user._id,
      bio: tutorData.bio,
      education: tutorData.education,
      teachingExperience: tutorData.teachingExperience,
      subjects: tutorData.subjects,
      hourlyRate: tutorData.hourlyRate,
      availability: tutorData.availability,
    });

    await tutor.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { user, tutor };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Tutor creation failed: ${error.message}`);
  }
};

const myProfile = async (user: JwtPayload) => {
  const isUserExist = await User.findById(user.userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.GONE, 'User is deleted');
  }

  const profile = await User.findById(user.userId);
  return profile;
};

const updateProfile = async (
  user: JwtPayload,
  profileImage: IImageFile | null,
  payload: Partial<IUser>,
) => {
  const existingUser = await User.findById(user.userId);
  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (existingUser.isDeleted) {
    throw new AppError(StatusCodes.GONE, 'User is deleted');
  }

  if (profileImage) {
    payload.profileImage = profileImage.path;
  }

  const updatedUser = await User.findByIdAndUpdate(
    user.userId,
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update profile');
  }

  return updatedUser;
};

const updateStatus = async (userId: string, user: JwtPayload) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Unauthorized to update status');
  }

  existingUser.isDeleted = !existingUser.isDeleted;
  await existingUser.save();

  return existingUser;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const users = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { users, meta };
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

export const userServices = {
  createStudent,
  createTutor,
  myProfile,
  updateProfile,
  updateStatus,
  getAllUsers,
  getSingleUser,
};
