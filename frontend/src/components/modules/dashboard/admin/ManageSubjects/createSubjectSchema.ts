import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
  category: z.string().min(1, "Category is required"),
});
