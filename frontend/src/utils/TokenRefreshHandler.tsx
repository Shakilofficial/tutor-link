"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const TokenRefreshHandler = () => {
  const { refetchUser } = useUser();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          await refetchUser();
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    };

    refreshToken();

    const intervalId = setInterval(refreshToken, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [refetchUser]);

  return null;
};

export default TokenRefreshHandler;
