import { z } from 'zod';

export const reviewValidations = {
  create: z.object({
    body: z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().min(1),
    }),
  }),
  update: z.object({
    body: z.object({
      rating: z.number().min(1).max(5).optional(),
      comment: z.string().min(1).optional(),
    }),
  }),
};
