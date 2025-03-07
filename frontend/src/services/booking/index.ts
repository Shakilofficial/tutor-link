/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

// Fetch My Bookings
export const myBookings = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/mybookings`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["BOOKINGS"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Accept Booking
export const acceptBooking = async (bookingId: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}/accept`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["BOOKINGS"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to accept booking");
    }

    // Revalidate after successful action
    revalidateTag("BOOKINGS");

    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Cancel Booking
export const cancelBooking = async (bookingId: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["BOOKINGS"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to cancel booking");
    }

    // Revalidate after successful action
    revalidateTag("BOOKINGS");

    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Make Payment
export const makePayment = async (bookingId: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}/make-payment`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["BOOKINGS"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("Payment initiation failed");
    }

    // Revalidate after successful action
    revalidateTag("BOOKINGS");

    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
