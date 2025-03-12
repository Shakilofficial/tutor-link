import PageHeader from "@/components/core/PageHeader";
import AddReviewDialog from "@/components/modules/reviews/AddReview/AddReviewDialog";
import ReviewCard from "@/components/modules/reviews/ReviewCard";
import TutorDetailsCard from "@/components/modules/tutors/TutorDetailsCard";
import { Card } from "@/components/ui/card";
import { getTutorReviews } from "@/services/reviewService";
import { getSingleSingleTutor } from "@/services/tutorService";
import { IReview } from "@/types/review";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: tutor } = await getSingleSingleTutor(id);
  const { data: reviews } = await getTutorReviews(id);

  return (
    <div className="container mx-auto px-2 space-y-10 my-16">
      <PageHeader
        title="Tutor Details"
        subtitle={`Created By ${tutor.user.name} | at ${new Date(
          tutor.createdAt
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}
      />
      <TutorDetailsCard tutor={tutor} />

      <div className="space-y-6 max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Student Reviews</h2>
          <AddReviewDialog tutor={tutor} />
        </div>

        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review: IReview) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <Card className="py-8 text-center">
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review this tutor!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
