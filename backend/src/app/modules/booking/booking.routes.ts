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

router.patch(
  '/:bookingId/cancel',
  auth(UserRole.STUDENT),
  bookingControllers.cancelBooking,
);

router.get(
  '/mybookings',
  auth(UserRole.STUDENT, UserRole.TUTOR),
  bookingControllers.getMyBookings,
);



router.get('/', bookingControllers.getAllBookings);

router.post(
  '/:bookingId/make-payment',
  auth(UserRole.STUDENT),
  bookingControllers.makePayment,
);

export const bookingRoutes = router;
