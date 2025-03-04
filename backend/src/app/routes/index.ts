import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { reviewRoutes } from '../modules/review/review.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { subjectRoutes } from '../modules/subject/subject.routes';
import { tutorRoutes } from '../modules/tutor/tutor.routes';
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
  {
    path: '/tutor',
    route: tutorRoutes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/review',
    route: reviewRoutes,
  },
  {
    path: '/booking',
    route: bookingRoutes,
  },
  /*  {
    path: '/ssl',
    route: SSLRoutes,
  }, */
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
