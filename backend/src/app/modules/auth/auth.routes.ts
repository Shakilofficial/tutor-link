import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from '../user/user.interface';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidations.loginUser),
  authControllers.loginUser,
);

router.post('/refresh-token', authControllers.refreshToken);

router.post(
  '/change-password',
  auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),
  validateRequest(authValidations.changePassword),
  authControllers.changePassword,
);

router.post('/forgot-password', authControllers.forgotPassword);
router.post('/verify-otp', authControllers.verifyOTP);
router.post('/reset-password', authControllers.resetPassword);

export const authRoutes = router;
