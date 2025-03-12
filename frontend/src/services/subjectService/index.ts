/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

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

export const createSubject = async (subject: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(subject),
    });
    revalidateTag("SUBJECTS");
    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
