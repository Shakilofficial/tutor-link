/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/utils/verifyToken";
import { revalidateTag } from "next/cache";

export const createBlog = async (data: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    const result = await res.json();
    revalidateTag("BLOGS");
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const getAllBlogs = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.title) params.append("title", query.title.toString());
  if (query?.author) params.append("author", query.author.toString());
  if (query?.category) params.append("category", query.category.toString());
  if (query?.sortBy) params.append("sort", query.sortBy.toString());
  if (query?.searchTerm)
    params.append("searchTerm", query.searchTerm.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog?limit=${limit}&page=${page}&${params}`,
      {
        next: { tags: ["BLOGS"] },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
