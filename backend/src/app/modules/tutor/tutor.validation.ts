import { z } from 'zod';

export const tutorValidations = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      role: z.string().optional(),
      profileImage: z.string().optional(),
      bio: z.string().min(1, 'Bio is required'),
      subjects: z.array(z.string()).min(1, 'Subjects are required'),
      hourlyRate: z.number().min(1, 'Hourly rate is required'),
      availability: z.array(
        z.object({
          day: z.string().min(1, 'Day is required'),
          timeSlots: z.array(z.string()).min(1, 'Time slots are required'),
        }),
      ),
    }),
  }),
  
  update: z.object({
    body: z.object({
      name: z.string().min(1).optional(),
      profileImage: z.string().optional(),
      bio: z.string().min(1).optional(),
      subjects: z.array(z.string()).min(1).optional(),
      hourlyRate: z.number().min(1).optional(),
      availability: z
        .array(
          z.object({
            day: z.string().min(1),
            timeSlots: z.array(z.string()).min(1),
          }),
        )
        .optional(),
    }),
  }),
};
