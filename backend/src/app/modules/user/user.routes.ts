import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

// Define routes
router.get('/', userController.getAll);

export const UserRoutes = router;
