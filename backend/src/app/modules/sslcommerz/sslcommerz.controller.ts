import { Request, Response } from 'express';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { sslService } from './sslcommerz.service';

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const tran_id = req.query.tran_id as string;
  const success = await sslService.validatePaymentService(tran_id);

  if (success) {
    res.redirect(config.ssl.success_url as string);
  } else {
    res.redirect(config.ssl.failed_url as string);
  }
});

export const SSLController = {
  validatePayment,
};
