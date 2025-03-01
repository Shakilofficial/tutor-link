import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '../user/user.interface';
import { studentControllers } from './student.controller';
import { studentValidations } from './student.validation';

const router = Router();

// Define routes
router.get('/', studentControllers.getAllStudents);

router.get('/:id', studentControllers.getSingleStudent);

router.patch(
  '/:id',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  validateRequest(studentValidations.update),
  studentControllers.updateStudent,
);

router.delete(
  '/:id',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  studentControllers.deleteStudent,
);

export const studentRoutes = router;
