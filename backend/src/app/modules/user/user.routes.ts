import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { userControllers } from './user.controller';

const router = Router();

// Define routes
router.post(
  '/create-student',
  multerUpload.single('profileImage'),
  parseBody,
  validateRequest(studentValidations.create),
  userControllers.createStudent,
);

export const userRoutes = router;
