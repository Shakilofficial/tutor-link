import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { Student } from '../student/student.model';
import { UserRole } from '../user/user.interface';
import { IReview } from './review.interface';
import { Review } from './review.model';
import { calculateAverageRating } from './review.utils';

const createReview = async (
  reviewData: IReview,
  user: JwtPayload,
  tutorId: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // First find the student document using user ID
    const student = await Student.findOne({ user: user.userId }).session(
      session,
    );

    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
    }

    // Check for existing review using student._id
    const existingReview = await Review.findOne({
      student: student._id,
      tutor: tutorId,
    }).session(session);

    if (existingReview) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'You have already reviewed this tutor',
      );
    }

    // Create review
    const review = await Review.create(
      [
        {
          ...reviewData,
          student: student._id,
          tutor: tutorId,
        },
      ],
      { session },
    );

    // Update tutor ratings
    await calculateAverageRating(tutorId, session);

    await session.commitTransaction();
    return review[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getTutorReviews = async (tutorId: string) => {
  const reviews = await Review.find({ tutor: tutorId }).populate({
    path: 'student',
    select: 'user',
    populate: {
      path: 'user',
      select: 'name profileImage',
    },
  });
  return reviews;
};

const updateReview = async (
  reviewId: string,
  payload: Partial<IReview>,
  user: JwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // First find the student document using user ID
    const student = await Student.findOne({ user: user.userId }).session(
      session,
    );

    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
    }

    const review = await Review.findById(reviewId).session(session);
    if (!review) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
    }

    // Compare with student._id instead of user ID
    if (review.student.toString() !== student._id.toString()) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Not authorized to update this review',
      );
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, payload, {
      new: true,
      session,
    });

    if (!updatedReview) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update review');
    }

    await calculateAverageRating(updatedReview.tutor.toString(), session);
    await session.commitTransaction();
    return updatedReview;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteReview = async (reviewId: string, user: JwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // First find the student document using user ID
    const student = await Student.findOne({ user: user.userId }).session(
      session,
    );

    if (!student && user.role !== UserRole.ADMIN) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student profile not found');
    }

    const review = await Review.findById(reviewId).session(session);
    if (!review) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
    }

    // Compare with student._id if not admin
    if (
      user.role !== UserRole.ADMIN &&
      review.student.toString() !== student!._id.toString()
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Not authorized to delete this review',
      );
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId, { session });
    await calculateAverageRating(review.tutor.toString(), session);
    await session.commitTransaction();
    return deletedReview;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const reviewServices = {
  createReview,
  getTutorReviews,
  updateReview,
  deleteReview,
};
