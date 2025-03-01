import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '../user/user.interface';
import { subjectControllers } from './subject.controller';
import { subjectValidations } from './subject.validation';

const router = Router();

// Define routes
router.get('/', subjectControllers.getAllSubjects);

router.get('/:id', subjectControllers.getSingleSubject);

router.post(
  '/',
  auth(UserRole.ADMIN),
  validateRequest(subjectValidations.create),
  subjectControllers.createSubject,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(subjectValidations.update),
  subjectControllers.updateSubject,
);

router.delete('/:id', auth(UserRole.ADMIN), subjectControllers.deleteSubject);

export const subjectRoutes = router;
