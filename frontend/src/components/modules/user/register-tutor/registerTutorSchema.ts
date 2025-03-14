import { z } from "zod";

export const registerTutorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio cannot exceed 500 characters"),
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
