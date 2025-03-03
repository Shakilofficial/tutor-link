import { z } from 'zod';

export const tutorValidations = {
  create: z.object({
    body: z.object({
      bio: z.string().min(1, 'Bio is required'),
      location: z.string().min(1, 'Location is required'),
      subjects: z.array(z.string()).min(1, 'Subjects are required'),
      hourlyRate: z.number().min(1, 'Hourly rate must be at least 1'),
      availability: z.array(
        z.object({
          day: z.string().min(1, 'Day is required'),
          timeSlots: z.array(z.string()).min(1, 'Time slots are required'),
        }),
      ),
      teachingExperience: z
        .number()
        .min(0, 'Teaching experience must be positive'),
      education: z.string().min(1, 'Education is required'),
    }),
  }),

  update: z.object({
    body: z.object({
      bio: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
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
      teachingExperience: z.number().min(0).optional(),
      education: z.string().min(1).optional(),
    }),
  }),
};
