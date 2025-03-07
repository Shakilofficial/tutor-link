import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { bookingValidations } from '../booking/booking.validation';
import { UserRole } from '../user/user.interface';
import { tutorControllers } from './tutor.controller';
import { tutorValidations } from './tutor.validation';

const router = Router();

// Define routes
router.get('/', tutorControllers.getAllTutors);

router.get('/:id', tutorControllers.getSingleTutor);

router.post(
  '/:id/book',
  auth(UserRole.STUDENT),
  validateRequest(bookingValidations.createBookingSchema),
  tutorControllers.createBooking,
);

router.patch(
  '/:id',
  auth(UserRole.TUTOR, UserRole.ADMIN),
  validateRequest(tutorValidations.update),
  tutorControllers.updateTutor,
);

router.delete(
  '/:id',
  auth(UserRole.TUTOR, UserRole.ADMIN),
  tutorControllers.deleteTutor,
);

export const tutorRoutes = router;
