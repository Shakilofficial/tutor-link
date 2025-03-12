import { z } from "zod";

export const addReviewSchema = z.object({
  rating: z.coerce.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(1, "Comment is required"),
});
