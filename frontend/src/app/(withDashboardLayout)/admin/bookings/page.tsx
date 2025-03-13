import ManageBookings from "@/components/modules/dashboard/admin/ManageBookings";
import { getAllBookings } from "@/services/booking";

const BookingsDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllBookings(page);

  return <ManageBookings bookings={data} meta={meta} />;
};

export default BookingsDashboardPage;
