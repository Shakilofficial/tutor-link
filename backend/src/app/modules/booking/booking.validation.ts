import { z } from 'zod';
import {
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
} from './booking.interface';

const createBookingSchema = z.object({
  body: z
    .object({
      subject: z.string().min(1, 'Subject ID is required'),
      startTime: z.coerce.date().refine((date) => date > new Date(), {
        message: 'Start time must be in the future',
      }),
      endTime: z.coerce.date(),
      paymentMethod: z.enum([PaymentMethod.ONLINE, PaymentMethod.CASH]),
    })
    .refine((data) => data.endTime > data.startTime, {
      message: 'End time must be after start time',
      path: ['endTime'],
    }),
});

const updateBookingStatusSchema = z.object({
  body: z.object({
    status: z
      .enum([BookingStatus.CONFIRMED, BookingStatus.CANCELLED])
      .optional(),
    paymentStatus: z
      .enum([PaymentStatus.PAID, PaymentStatus.REFUNDED])
      .optional(),
  }),
});

export const bookingValidations = {
  createBookingSchema,
  updateBookingStatusSchema,
};
