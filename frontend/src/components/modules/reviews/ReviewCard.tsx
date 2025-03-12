/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import { Card } from "@/components/core/HoverEffect";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { deleteReview } from "@/services/reviewService";
import { IReview } from "@/types/review";
import { Edit, Star, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import EditReviewDialog from "./EditReview/EditReviewDialog";

const ReviewCard = ({ review }: { review: IReview }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { user } = useUser();
  const isReviewer = review.student.user._id === user?.userId;

  const onDelete = async (reviewId: string) => {
    try {
      const result = await deleteReview(reviewId);
      if (result.success) {
        toast.success("Review deleted successfully ✨");
      } else {
        toast.error(result.message || "Failed to delete review. Try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <Card className="relative p-4 rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
            <Image
              src={review.student.user.profileImage || "/placeholder-user.jpg"}
              alt={`${review.student.user.name}'s profile`}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {review.student.user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>

        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} size={20} fill="currentColor" stroke="none" />
          ))}
        </div>

        {isReviewer && (
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="p-2"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit size={24} />
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(true)}
              size="icon"
              variant="destructive"
              className="p-2"
            >
              <Trash size={18} />
            </Button>
          </div>
        )}
      </div>

      {isReviewer && (
        <EditReviewDialog
          review={review}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => onDelete(review._id)}
        title="Delete Review"
        description="Are you sure you want to delete this review?"
        actionText="delete this review"
        confirmButtonText="Delete"
      />
    </Card>
  );
};

export default ReviewCard;
