import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '../user/user.interface';
import { bookingControllers } from './booking.controller';
import { bookingValidations } from './booking.validation';

const router = Router();

router.post(
  '/:tutorId/book',
  auth(UserRole.STUDENT),
  validateRequest(bookingValidations.createBookingSchema),
  bookingControllers.createBooking,
);

router.patch(
  '/:bookingId/accept',
  auth(UserRole.TUTOR),
  bookingControllers.acceptBooking,
);

export const bookingRoutes = router;
