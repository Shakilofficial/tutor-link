import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

// Define routes
router.get('/', studentController.getAll);

export default router;
