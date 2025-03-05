import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middleware/auth';
import { parseBody } from '../../middleware/bodyParser';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '../user/user.interface';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
  multerUpload.single('thumbnail'),
  parseBody,
  validateRequest(blogValidations.create),
  blogControllers.createBlog,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
  multerUpload.single('thumbnail'),
  parseBody,
  validateRequest(blogValidations.update),
  blogControllers.updateBlog,
);

router.patch(
  '/:id/publish',
  auth(UserRole.ADMIN),
  blogControllers.togglePublishBlog,
);

router.get('/', blogControllers.getAllBlogs);

router.get('/:id', blogControllers.getSingleBlog);

router.get('/:slug', blogControllers.getBlogBySlug);

router.delete('/:id', auth(UserRole.ADMIN), blogControllers.deleteBlog);

export const blogRoutes = router;
