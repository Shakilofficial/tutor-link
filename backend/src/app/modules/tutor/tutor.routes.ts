import { Router } from 'express';
import { tutorController } from './tutor.controller';

const router = Router();

// Define routes
router.get('/', tutorController.getAll);

export default router;
