/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IImageFile } from '../../interface/IImageFile';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { ITutor } from '../tutor/tutor.interface';
import { Tutor } from '../tutor/tutor.model';
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

    const student = new Student({ ...studentData, userId: user._id });
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
      userId: user._id,
      bio: tutorData.bio,
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

export const userServices = { createStudent, createTutor };
