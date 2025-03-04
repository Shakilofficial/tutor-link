import { Router } from 'express';
import { SSLController } from './sslcommerz.controller';

const router = Router();

router.get('/validate', SSLController.validatePayment);

export const sslRoutes = router;
