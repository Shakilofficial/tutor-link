/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export const getAllReviews = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      next: {
        tags: ["REVIEWS"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getTutorReviews = async (tutorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/tutor/${tutorId}`,
      {
        next: {
          tags: ["REVIEWS"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const createReview = async (data: any, tutorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/tutor/${tutorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateReview = async (reviewId: string, data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
