import MyBookingsList from "@/components/modules/dashboard/student/MyBookingsList";
import { myBookings } from "@/services/booking";

const MyBookingsPage = async () => {
  const { data: bookings } = await myBookings();
  console.log(bookings);
  return (
    <div>
      <MyBookingsList bookings={bookings} />
    </div>
  );
};

export default MyBookingsPage;
