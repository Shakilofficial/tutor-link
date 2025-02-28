import { z } from 'zod';

export const tutorValidation = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(8, 'Password must be at least 6 characters'),
      role: z.string().optional(),
      profileImage: z.string().optional(),
      bio: z.string().min(1, 'Bio is required'),
      subjects: z.array(z.string()).min(1, 'Subjects are required'),
      hourlyRate: z.number().min(1, 'Hourly rate is required'),
      availability: z.array(z.string()).min(1, 'Availability is required'),
    }),
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(1).optional(),
      email: z.string().email('Invalid email format').optional(),
      profileImage: z.string().optional(),
      bio: z.string().min(1).optional(),
      subjects: z.array(z.string()).min(1).optional(),
      hourlyRate: z.number().min(1).optional(),
      availability: z.array(z.string()).min(1).optional(),
    }),
  }),
};
