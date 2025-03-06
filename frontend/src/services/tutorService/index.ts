/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

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
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor?limit=${limit}&page=${page}&${params}`,
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tutor/${id}`, {
      next: {
        tags: ["TUTORS"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
