import Logo from "@/components/shared/Logo";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-orange-200/50 dark:bg-grid-orange-800/20 bg-[size:20px_20px] opacity-20" />

      {/* Glass effect card */}
      <div className="relative w-full max-w-md md:max-w-lg rounded-2xl p-6 md:p-8 flex flex-col items-center backdrop-blur-sm shadow-2xl border border-orange-200/30 bg-white/80 dark:border-orange-800/20 dark:bg-orange-950/80 space-y-8 transition-all duration-300">
        <div className="w-full max-w-[180px] mx-auto mb-2">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
