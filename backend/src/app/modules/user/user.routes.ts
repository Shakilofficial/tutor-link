import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { tutorValidations } from '../tutor/tutor.validation';
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

router.post(
  '/create-tutor',
  multerUpload.single('profileImage'),
  parseBody,
  validateRequest(tutorValidations.create),
  userControllers.createTutor
);

export const userRoutes = router;
