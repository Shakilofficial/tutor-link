import { z } from 'zod';

export const studentValidations = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      location: z.string().min(1, 'Location is required'),
      profileImage: z.string().optional(),
    }),
  }),
};
