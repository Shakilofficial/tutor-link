import { z } from "zod";

export const registerStudentSchema = z.object({
  name: z.string().min(2, "Brand name is required."),
  email: z.string().email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  location: z.string().min(2, "Location is required."),
  phone: z.string().min(10, "Phone number is required."),
  profileImage: z.any().optional(),
});
