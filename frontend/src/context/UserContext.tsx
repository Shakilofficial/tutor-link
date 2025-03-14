/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getCurrentUser, logoutUser as logoutUserService } from "@/services/authService";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants/protectedRoutes";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: any | null) => void;
  refetchUser: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUserService();
      setUser(null);
      const currentPath = window.location.pathname;
      if (protectedRoutes.some((route) => currentPath.match(route))) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ 
        isLoading, 
        user, 
        setUser, 
        refetchUser: fetchUser, 
        setIsLoading,
        logout 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;