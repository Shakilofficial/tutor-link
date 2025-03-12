import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { metaRoutes } from '../modules/meta/meta.route';
import { reviewRoutes } from '../modules/review/review.routes';
import { sslRoutes } from '../modules/sslcommerz/sslcommerz.route';
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
    path: '/tutors',
    route: tutorRoutes,
  },
  {
    path: '/students',
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
  {
    path: '/ssl',
    route: sslRoutes,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
  {
    path: '/meta',
    route: metaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
