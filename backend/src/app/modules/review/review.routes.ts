import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '../user/user.interface';
import { reviewControllers } from './review.controller';
import { reviewValidations } from './review.validation';

const router = Router();

router.post(
  '/tutor/:tutorId',
  auth(UserRole.STUDENT),
  validateRequest(reviewValidations.create),
  reviewControllers.createReview,
);

router.get('/tutor/:tutorId', reviewControllers.getTutorReviews);

router.patch(
  '/:reviewId',
  auth(UserRole.STUDENT),
  validateRequest(reviewValidations.update),
  reviewControllers.updateReview,
);

router.delete(
  '/:reviewId',
  auth(UserRole.ADMIN, UserRole.STUDENT),
  reviewControllers.deleteReview,
);

export const reviewRoutes = router;
