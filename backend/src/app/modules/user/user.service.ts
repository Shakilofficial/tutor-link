/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { IImageFile } from '../../interface/IImageFile';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { Subject } from '../subject/subject.model';
import { ITutor } from '../tutor/tutor.interface';
import { Tutor } from '../tutor/tutor.model';
import { userSearchableFields } from './user.const';
import { IUser, UserRole } from './user.interface';
import { User } from './user.model';

const createStudent = async (
  userData: Partial<IUser>,
  studentData: Partial<IStudent> | undefined,
  profileImage: IImageFile | null,
) => {
  if (!studentData) {
    throw new Error('Student data is missing from the request.');
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (profileImage) userData.profileImage = profileImage.path;
    userData.role = UserRole.STUDENT;

    const user = new User(userData);
    await user.save({ session });

    const student = new Student({
      user: user._id,
      location: studentData.location,
    });
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
  tutorData: Partial<ITutor>,
  profileImage?: IImageFile,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Validate Subjects
    if (tutorData.subjects && tutorData.subjects.length > 0) {
      const existingSubjects = await Subject.countDocuments({
        _id: { $in: tutorData.subjects },
      }).session(session);

      if (existingSubjects !== tutorData.subjects.length) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'One or more subjects are invalid',
        );
      }
    }

    // 2. Handle Profile Image
    if (profileImage && profileImage.path) {
      userData.profileImage = profileImage.path;
    }

    // 3. Create User
    userData.role = UserRole.TUTOR;
    const user = new User(userData);
    await user.save({ session });

    // 4. Validate Availability Slots
    if (tutorData.availability) {
      tutorData.availability.forEach((day) => {
        day.slots.forEach((slot) => {
          const start = parseInt(slot.start.replace(':', ''), 10);
          const end = parseInt(slot.end.replace(':', ''), 10);
          if (start >= end) {
            throw new AppError(
              StatusCodes.BAD_REQUEST,
              'End time must be after start time',
            );
          }
        });
      });
    }

    // 5. Create Tutor Profile
    const tutor = new Tutor({
      user: user._id,
      ...tutorData,
      hourlyRate: Math.round((tutorData.hourlyRate || 0) * 100) / 100,
      totalEarnings: 0,
    });

    await tutor.save({ session });
    await session.commitTransaction();
    session.endSession();

    return { user, tutor };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      throw new AppError(
        StatusCodes.CONFLICT,
        'Tutor profile already exists for this user',
      );
    }

    throw new AppError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Tutor creation failed',
    );
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

const toggleUserVerify = async (userId: string, user: JwtPayload) => {
  const existingUser = await User.checkUserExist(userId);
  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.role !== UserRole.ADMIN) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Unauthorized to verify user');
  }

  existingUser.isVerified = !existingUser.isVerified;
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
  toggleUserVerify,
};
