/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";
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

    revalidateTag("USERS");
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

    revalidateTag("USERS");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyProfile = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/my-profile`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["USERS"],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: data,
      }
    );

    revalidateTag("USERS");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateStatus = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${id}/update-status`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("USERS");
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user status");
  }
};

export const toggleUserVerify = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${id}/verify-user`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("USERS");
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to verify user");
  }
};

export const getAllUsers = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["USERS"],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleUser = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["USERS"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
