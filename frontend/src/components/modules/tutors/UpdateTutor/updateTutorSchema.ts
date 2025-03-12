import { z } from "zod";

export const updateTutorSchema = z.object({
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500)
    .optional(),
  location: z.string().min(1, "Location is required").optional(),
  subjects: z
    .array(z.string())
    .min(1, "At least one subject is required")
    .optional(),
  hourlyRate: z.coerce.number().min(100, "Minimum rate is 100 BDT").optional(),
  availability: z
    .array(
      z.object({
        day: z.enum([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]),
        slots: z
          .array(
            z.object({
              start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
              end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            })
          )
          .min(1),
      })
    )
    .optional(),
});
