import { z } from 'zod';
import { UserRole } from './user.interface';
export const userValidations = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      role: z.nativeEnum(UserRole).optional(),
      profileImage: z.string().optional(),
      location: z.string().min(1, 'Location is required'),
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().min(1).optional(),
      profileImage: z.string().optional(),
      location: z.string().optional(),
      isVerified: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
};
