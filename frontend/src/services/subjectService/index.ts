/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllSubjects = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subject?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["SUBJECTS"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
