import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { studentControllers } from './student.controller';

const router = Router();

// Define routes
router.get('/', studentControllers.getAllStudents);

router.get('/:id', studentControllers.getSingleStudent);

router.patch(
  '/:id',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  studentControllers.updateStudent,
);

router.delete(
  '/:id',
  auth(UserRole.STUDENT, UserRole.ADMIN),
  studentControllers.deleteStudent,
);

export const studentRoutes = router;
