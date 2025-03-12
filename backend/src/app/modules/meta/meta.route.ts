import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { metaControllers } from './meta.controller';

const router = Router();

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  metaControllers.getMetaData,
);

export const metaRoutes = router;
