import { z } from "zod";

export const editReviewSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5")
    .optional(),
  comment: z.string().min(1, "Comment is required").optional(),
});
