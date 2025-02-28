/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IImageFile } from '../../interface/IImageFile';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser, UserRole } from './user.interface';
import User from './user.model';

const createStudent = async (
  userData: IUser,
  payload: Partial<IStudent>,
  profileImage: IImageFile | null,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create User
    if (profileImage && profileImage.path) {
      userData.profileImage = profileImage.path;
    }
    userData.role = UserRole.STUDENT;

    const user = new User(userData);
    await user.save({ session });

    // 2. Create Student (Reference User)
    const student = new Student({
      ...payload,
      userId: user._id,
    });
    await student.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return { user, student };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }
};

export const userServices = { createStudent };
