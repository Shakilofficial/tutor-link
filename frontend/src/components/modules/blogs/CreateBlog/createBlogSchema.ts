import { BlogCategory } from "@/constants/categories";
import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  category: z.nativeEnum(BlogCategory),
});
