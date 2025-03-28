/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cancelBooking, makePayment } from "@/services/booking";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MyBookingsList = ({ bookings }: { bookings: any[] }) => {
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [page, setPage] = useState(1);
  const limit = 10;

  const totalPages = Math.ceil(bookings.length / limit);
  const paginatedBookings = bookings.slice((page - 1) * limit, page * limit);

  const handlePaymentClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsPaymentModalOpen(true);
  };

  const handleCancelClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsCancelModalOpen(true);
  };

  const handleMakePayment = async () => {
    if (!selectedBookingId) return;
    try {
      const result = await makePayment(selectedBookingId);
      if (result?.success) {
        router.push(result.data.paymentUrl);
        toast.success("Redirecting to payment page...");
        setIsPaymentModalOpen(false);
        setSelectedBookingId(null);
      } else {
        toast.error(result?.message || "Failed to process payment");
      }
    } catch (error: any) {
      toast.error(error?.message || "Error making payment");
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;
    try {
      const result = await cancelBooking(selectedBookingId);
      if (result?.success) {
        toast.success("Booking cancelled successfully!");
        setIsCancelModalOpen(false);
        setSelectedBookingId(null);
        // Refresh the page or update the bookings list
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to cancel booking");
      }
    } catch (error: any) {
      toast.error(error?.message || "Error cancelling booking");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20 text-center">
          <CardTitle className="text-xl text-orange-700 dark:text-orange-300">
            Manage All Bookings
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-6">
          <div className="rounded-md border border-orange-200 dark:border-orange-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-orange-100 dark:bg-orange-900/40">
                <TableRow>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map((booking) => (
                  <TableRow
                    key={booking._id}
                    className="hover:bg-orange-50 dark:hover:bg-orange-900/10 h-16"
                  >
                    <TableCell>
                      <Image
                        src={booking.tutor.user.profileImage}
                        alt="Tutor name"
                        width={40}
                        height={40}
                        className="rounded-sm"
                      />
                    </TableCell>
                    <TableCell>{booking.subject.name}</TableCell>
                    <TableCell>
                      {new Date(booking.startTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(booking.endTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{booking.durationHours} hrs</TableCell>
                    <TableCell>${booking.amount}</TableCell>
                    <TableCell>{booking.paymentMethod}</TableCell>
                    <TableCell
                      className={
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {booking.status}
                    </TableCell>
                    <TableCell
                      className={
                        booking.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {booking.paymentStatus}
                    </TableCell>
                    <TableCell>
                      {booking.status === "accepted" &&
                        booking.paymentStatus === "pending" && (
                          <button
                            onClick={() => handlePaymentClick(booking._id)}
                            className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                          >
                            Payment
                          </button>
                        )}
                      {booking.status === "pending" &&
                        booking.paymentStatus === "pending" && (
                          <button
                            onClick={() => handleCancelClick(booking._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-md bg-orange-200 dark:bg-orange-700 disabled:opacity-50 flex items-center"
            >
              <ArrowLeftCircle className="h-4 w-4" />
            </button>

            {/* Display Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-4 py-1 border rounded-md ${
                  page === index + 1
                    ? "bg-orange-600 text-white"
                    : "bg-orange-200 dark:bg-orange-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-md bg-orange-200 dark:bg-orange-700 disabled:opacity-50 flex items-center"
            >
              <ArrowRightCircle className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onConfirm={handleMakePayment}
        title="Make Payment"
        description="Are you sure you want to proceed with this payment? You will be redirected to the payment page."
        confirmButtonText="Proceed"
        actionText="Payment"
      />

      <ConfirmDialog
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onConfirm={handleCancelBooking}
        title="Cancel Booking"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmButtonText="Cancel Booking"
        actionText="Cancellation"
      />
    </div>
  );
};

export default MyBookingsList;
