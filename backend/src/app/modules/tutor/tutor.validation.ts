import { z } from 'zod';

export const tutorValidations = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      bio: z
        .string()
        .min(50, 'Bio must be at least 50 characters')
        .max(500, 'Bio cannot exceed 500 characters'),
      location: z.string().min(1, 'Location is required'),
      subjects: z
        .array(z.string().regex(/^[a-f\d]{24}$/i, 'Invalid subject ID'))
        .min(1, 'At least one subject is required'),
      hourlyRate: z.number().min(100, 'Hourly rate must be at least 100 BDT'),
      availability: z
        .array(
          z.object({
            day: z.enum([
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]),
            slots: z
              .array(
                z.object({
                  start: z
                    .string()
                    .regex(
                      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      'Invalid start time format (HH:mm)',
                    ),
                  end: z
                    .string()
                    .regex(
                      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      'Invalid end time format (HH:mm)',
                    ),
                }),
              )
              .min(1, 'At least one time slot is required'),
          }),
        )
        .min(1, 'Availability is required'),
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      bio: z.string().min(50).max(500).optional(),
      location: z.string().min(1).optional(),
      subjects: z
        .array(z.string().regex(/^[a-f\d]{24}$/i))
        .min(1)
        .optional(),
      hourlyRate: z.number().min(100).optional(),
      availability: z
        .array(
          z.object({
            day: z.enum([
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]),
            slots: z
              .array(
                z.object({
                  start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
                  end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
                }),
              )
              .min(1),
          }),
        )
        .optional(),
    }),
  }),
};
