import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/appError';
import { UserRole } from '../user/user.interface';
import { User } from '../user/user.model';
import { ITutor } from './tutor.interface';
import { Tutor } from './tutor.model';

const getAllTutors = async () => {
  return await Tutor.find()
    .populate({
      path: 'user',
      select: 'name email profileImage -_id',
    })
    .populate({
      path: 'subjects',
      select: 'name gradeLevel -_id',
    })
    .populate({
      path: 'reviews',
      select: 'rating comment -_id',
    })
    .lean();
};

const getSingleTutor = async (id: string) => {
  const tutor = await Tutor.findById(id)
    .populate({
      path: 'user',
      select: 'name email profileImage -_id',
    })
    .populate({
      path: 'subjects',
      select: 'name gradeLevel -_id',
    })
    .populate({
      path: 'reviews',
      select: 'rating comment -_id',
    })
    .lean();

  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }
  return tutor;
};

const updateTutor = async (
  id: string,
  payload: Partial<ITutor>,
  user: JwtPayload,
) => {
  const tutor = await Tutor.findById(id);

  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }

  // Authorization check
  if (user.role !== UserRole.ADMIN && tutor.user.toString() !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this tutor profile',
    );
  }

  const updatedTutor = await Tutor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    populate: ['user', 'subjects'],
  }).lean();

  return updatedTutor;
};

const deleteTutor = async (id: string, user: JwtPayload) => {
  const tutor = await Tutor.findById(id);

  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }

  // Authorization check
  if (user.role !== UserRole.ADMIN && tutor.user.toString() !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this tutor profile',
    );
  }

  const session = await Tutor.startSession();
  session.startTransaction();

  try {
    await Tutor.findByIdAndDelete(id).session(session);
    await User.findByIdAndDelete(tutor.user).session(session);
    await session.commitTransaction();
    return { message: 'Tutor profile deleted successfully' };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const tutorServices = {
  getAllTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
};
