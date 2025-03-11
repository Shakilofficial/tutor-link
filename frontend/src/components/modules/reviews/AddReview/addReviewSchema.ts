import { z } from "zod";

export const addReviewSchema = z.object({
  rating: z.coerce.number().min(1, "Rating is required"),
  comment: z.string().min(1, "Comment is required"),
});
