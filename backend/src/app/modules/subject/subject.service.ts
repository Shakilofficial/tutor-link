import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/appError';
import { UserRole } from '../user/user.interface';
import { ISubject } from './subject.interface';
import { Subject } from './subject.model';

const createSubject = async (payload: ISubject, user: JwtPayload) => {
  // Check if subject already exists
  const existingSubject = await Subject.findOne({ name: payload.name });
  if (existingSubject) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Subject already exists');
  }
  const subject = new Subject({
    ...payload,
    createdBy: user.userId,
  });
  return await subject.save();
};

const getAllSubjects = async () => {
  return await Subject.find();
};

const getSingleSubject = async (id: string) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Subject not found');
  }
  return subject;
};

// In subject.service.ts

const updateSubject = async (
  id: string,
  payload: Partial<ISubject>,
  user: JwtPayload,
) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Subject not found');
  }

  if (
    user.role === UserRole.ADMIN &&
    subject.createdBy.toString() !== user.userId
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to edit the subject!',
    );
  }

  const result = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteSubject = async (id: string, user: JwtPayload) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Subject not found');
  }

  if (
    user.role === UserRole.ADMIN &&
    subject.createdBy.toString() !== user.userId
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the subject!',
    );
  }

  await Subject.findByIdAndDelete(id);
};

export const subjectServices = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
