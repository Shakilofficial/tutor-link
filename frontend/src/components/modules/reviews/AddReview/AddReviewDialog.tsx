/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { createReview } from "@/services/reviewService";
import { ITutor } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addReviewSchema } from "./addReviewSchema";

const AddReviewDialog = ({ tutor }: { tutor: ITutor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  const form = useForm({
    resolver: zodResolver(addReviewSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit = async (data: any) => {
    try {
      const response = await createReview(data, tutor._id);

      if (response.success) {
        toast.success("Review Added Successfully 🎉");
        reset();
        setIsOpen(false);
      } else {
        toast.error(
          response.message || "Failed to add review. Please try again."
        );
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!user.user}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Review
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[360px] md:max-w-md rounded-lg border-2 border-orange-500/50 bg-gradient-to-bl from-orange-500/0.5 to-orange-700/0.5">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Review to {tutor.user.name}
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
              placeholder="Enter your comment"
            />
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewDialog;
