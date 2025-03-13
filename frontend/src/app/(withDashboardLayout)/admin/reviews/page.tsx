import ReviewManagement from "@/components/modules/dashboard/admin/ReviewManagement";
import { getAllReviews } from "@/services/reviewService";

const ReviewsDashboardPage = async () => {
  const { data } = await getAllReviews();
  console.log(data);
  return (
    <div>
      <ReviewManagement reviews={data} />
    </div>
  );
};

export default ReviewsDashboardPage;
