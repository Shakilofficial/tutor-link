/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";

export const createBooking = async (tutorId: string, booking: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors/${tutorId}/book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(booking),
      }
    );

    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getAllTutors = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  if (query?.location) {
    params.append("brands", query?.location.toString());
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ["TUTORS"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleSingleTutor = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tutors/${id}`, {
      next: {
        tags: ["TUTORS"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
