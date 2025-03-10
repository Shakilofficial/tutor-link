/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createStudent = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-student`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createTutor = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-tutor`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
