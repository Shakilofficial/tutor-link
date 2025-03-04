import { Router } from 'express';
import { SSLController } from './sslcommerz.controller';

const router = Router();

router.post('/validate', SSLController.validatePayment);

export const sslRoutes = router;
