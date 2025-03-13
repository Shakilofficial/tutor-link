import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middleware/auth';
import { parseBody } from '../../middleware/bodyParser';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { tutorValidations } from '../tutor/tutor.validation';
import { userControllers } from './user.controller';
import { UserRole } from './user.interface';
import { userValidations } from './user.validation';

const router = Router();

// Define routes
router.post(
  '/create-student',
  multerUpload.single('profileImage'),
  parseBody,
  validateRequest(studentValidations.create),
  userControllers.createStudent,
);

router.post(
  '/create-tutor',
  multerUpload.single('profileImage'),
  parseBody,
  validateRequest(tutorValidations.create),
  userControllers.createTutor,
);

router.get(
  '/my-profile',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
  userControllers.myProfile,
);

router.patch(
  '/update-profile',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
  multerUpload.single('profileImage'),
  parseBody,
  validateRequest(userValidations.update),
  userControllers.updateProfile,
);

router.patch(
  '/:id/update-status',
  auth(UserRole.ADMIN),
  userControllers.updateStatus,
);

router.patch(
  '/:id/verify-user',
  auth(UserRole.ADMIN),
  userControllers.toggleUserVerify,
);

router.get('/:id', userControllers.getSingleUser);

router.get('/', userControllers.getAllUsers);

export const userRoutes = router;
