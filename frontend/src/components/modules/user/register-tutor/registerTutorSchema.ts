import { z } from "zod";

const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

export const registerTutorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  subjects: z
    .array(z.string().regex(/^[a-f\d]{24}$/i, "Invalid subject ID"))
    .min(1, "At least one subject required"),
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio cannot exceed 500 characters"),
  hourlyRate: z.coerce.number().min(100, "Minimum hourly rate is 100 BDT"),
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
              start: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),
              end: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),
            })
          )
          .min(1, "At least one time slot required"),
      })
    )
    .min(1, "At least one availability day required"),
  profileImage: z.any().optional(),
});
