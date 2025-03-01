import { Router } from 'express';
import { subjectControllers } from './subject.controller';

const router = Router();

// Define routes
router.post(
  '/',

  subjectControllers.createSubject,
);

export const subjectRoutes = router;
