"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const TokenRefreshHandler = () => {
  const { setUser, setIsLoading } = useUser();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }

        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    refreshToken();

    const intervalId = setInterval(refreshToken, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [setUser, setIsLoading]);

  return null;
};

export default TokenRefreshHandler;
