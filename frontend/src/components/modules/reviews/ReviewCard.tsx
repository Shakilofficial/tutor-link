import { Card } from "@/components/core/HoverEffect";
import { IReview } from "@/types/review";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
    <Card className="p-6 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="relative h-12 w-12 overflow-hidden rounded-full border">
            <Image
              src={review.student.user.profileImage || "/placeholder-user.jpg"}
              alt={`${review.student.user.name}'s profile`}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">{review.student.user.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Reviewed on{" "}
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-orange-500">
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} size={18} fill="currentColor" stroke="none" />
        ))}
      </div>

      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
    </Card>
  );
};

export default ReviewCard;
