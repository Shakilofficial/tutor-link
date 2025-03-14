/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { updateReview } from "@/services/reviewService";
import { IReview } from "@/types/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editReviewSchema } from "./editReviewSchema";

const EditReviewDialog = ({
  review,
  isOpen,
  setIsOpen,
}: {
  review: IReview;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(editReviewSchema),
    mode: "onChange",
    defaultValues: {
      rating: review.rating,
      comment: review.comment,
    },
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit = async (data: any) => {
    try {
      const response = await updateReview(review._id, data);
      if (response.success) {
        toast.success("Review Updated Successfully ✨");
        reset();
        setIsOpen(false);
      } else {
        toast.error(response.message || "Failed to update review. Try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[360px] md:max-w-md rounded-lg border-2 border-orange-500/50 bg-gradient-to-bl from-orange-500/0.5 to-orange-700/0.5">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Edit Review
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Form
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isValid={isValid}
            recaptchaStatus={true}
          >
            <TextInput
              name="rating"
              label="Rating"
              placeholder="Enter your rating"
              type="number"
            />
            <Textarea
              name="comment"
              label="Comment"
              placeholder="Update your comment"
            />
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewDialog;
