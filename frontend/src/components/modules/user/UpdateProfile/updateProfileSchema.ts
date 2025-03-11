import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Brand name is required.").optional(),
  phone: z.string().min(10, "Phone number is required.").optional(),
  profileImage: z.any().optional(),
});
