import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { UserRole } from '../user/user.interface';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.const';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find().populate('user'), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const students = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();
  return { students, meta };
};

const getSingleStudent = async (id: string) => {
  const student = await Student.findById(id).populate('user').lean();

  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }
  return student;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
  user: JwtPayload,
) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }

  // Authorization check
  if (user.role !== UserRole.ADMIN && student.user.toString() !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this student profile',
    );
  }

  const updatedStudent = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    populate: ['user'],
  }).lean();

  return updatedStudent;
};

const deleteStudent = async (id: string, user: JwtPayload) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }

  // Authorization check
  if (user.role !== UserRole.ADMIN && student.user.toString() !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this student profile',
    );
  }

  const session = await Student.startSession();
  session.startTransaction();

  try {
    await Student.findByIdAndDelete(id).session(session);
    await User.findByIdAndDelete(student.user).session(session);
    await session.commitTransaction();
    return { message: 'Student profile deleted successfully' };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const studentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
