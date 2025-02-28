import { z } from 'zod';

export const studentValidations = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      role: z.string().optional(),
      profileImage: z.string().optional(),
      subjects: z.array(z.string()).min(1, 'Subjects are required'),
    }),
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(1).optional(),
      email: z.string().email('Invalid email format').optional(),
      profileImage: z.string().optional(),
      subjects: z.array(z.string()).min(1).optional(),
    }),
  }),
};
