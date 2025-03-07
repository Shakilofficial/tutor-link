import { z } from "zod";

export const createBookingSchema = z
  .object({
    subject: z.string().min(1, "Subject is required"),
    startTime: z.date().refine((date) => date > new Date(), {
      message: "Start time must be in the future",
    }),
    endTime: z.date(),
    paymentMethod: z.enum(["online", "cash"]),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });
