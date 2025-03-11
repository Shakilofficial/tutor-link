/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

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
    revalidateTag("TUTORS");
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

  if (query?.location) params.append("location", query.location.toString());
  if (query?.subject) params.append("subjects.name", query.subject.toString());
  if (query?.rating) params.append("averageRating", query.rating.toString());
  if (query?.availability)
    params.append("availability.day", query.availability.toString());
  if (query?.sortBy) params.append("sort", query.sortBy.toString());
  if (query?.searchTerm)
    params.append("searchTerm", query.searchTerm.toString());

  if (query?.minPrice) params.append("minPrice", query.minPrice.toString());
  if (query?.maxPrice) params.append("maxPrice", query.maxPrice.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors?limit=${limit}&page=${page}&${params}`,
      {
        next: { tags: ["TUTORS"] },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleSingleTutor = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors/${id}`,
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
