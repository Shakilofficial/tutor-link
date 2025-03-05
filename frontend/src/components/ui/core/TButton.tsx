"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const TButton: React.FC<TButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "cursor-pointer inline-flex items-center rounded-2xl px-2 py-1.5 font-mono font-semibold text-orange-600 hover:text-white border-2 border-orange-600",
        "hover:bg-orange-600 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-90 duration-300 focus:bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default TButton;
