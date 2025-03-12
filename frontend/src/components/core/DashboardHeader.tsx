"use client";
import { useUser } from "@/context/UserContext";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  const { user } = useUser();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-muted-foreground mt-1 text-xs md:text-md">
        {subtitle ? (
          subtitle
        ) : (
          <>
            Welcome back,{" "}
            <span className="font-semibold text-primary bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded-md">
              {user?.name || "User"}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default DashboardHeader;
