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
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-status/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag("USERS");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const toggleUserVerify = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/verify-user/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag("USERS");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUsers = async (query: Record<string, unknown>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(query),
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
