import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { subjectRoutes } from '../modules/subject/subject.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/subject',
    route: subjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
