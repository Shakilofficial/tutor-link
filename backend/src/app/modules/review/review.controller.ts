import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewServices.createReview(
    req.body,
    req.user,
    req.params.tutorId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review created successfully',
    data: review,
  });
});

const getTutorReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await reviewServices.getTutorReviews(req.params.tutorId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: reviews,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewServices.updateReview(
    req.params.reviewId,
    req.body,
    req.user!,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated successfully',
    data: review,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await reviewServices.deleteReview(req.params.reviewId, req.user!);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review deleted successfully',
    data: null,
  });
});

export const reviewControllers = {
  createReview,
  getTutorReviews,
  updateReview,
  deleteReview,
};
