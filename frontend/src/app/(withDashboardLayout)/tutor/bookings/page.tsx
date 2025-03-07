import BookingRequestList from "@/components/modules/dashboard/tutor/BookingRequestList";
import { myBookings } from "@/services/booking";

const AllBookingsRequestPage = async () => {
  const { data: bookings } = await myBookings();
  console.log(bookings);
  return (
    <div>
      <BookingRequestList bookings={bookings} />
    </div>
  );
};

export default AllBookingsRequestPage;
