import Logo from "@/components/shared/Logo";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 relative">
      {/* Content Container */}
      <div className="relative w-full max-w-md rounded-lg p-8 flex flex-col items-center backdrop-blur-lg shadow-xl border border-rose-950/20 bg-rose-950/10 dark:border-rose-800/20 space-y-10">
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
