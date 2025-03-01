import { Router } from 'express';
import { tutorControllers } from './tutor.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import validateRequest from '../../middleware/validateRequest';
import { tutorValidations } from './tutor.validation';

const router = Router();

// Define routes
router.get('/', tutorControllers.getAllTutors);

router.get('/:id', tutorControllers.getSingleTutor);

router.patch('/:id', auth(UserRole.TUTOR), validateRequest(tutorValidations.update), tutorControllers.updateTutor);

router.delete('/:id', auth(UserRole.TUTOR), tutorControllers.deleteTutor);

export const tutorRoutes = router;
