/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface Route {
  href: string;
  label: string;
  active: boolean;
}

interface MainNavProps {
  routes: Route[];
  pathname: string;
}

const MainNav = ({ routes }: MainNavProps) => {
  return (
    <nav className="mx-6 hidden lg:flex items-center space-x-1">
      {routes.map((route, index) => (
        <Link
          key={route.href}
          href={route.href}
          className="relative px-3 py-2 group"
        >
          <span
            className={cn(
              "relative z-10 text-sm font-medium transition-colors duration-300",
              route.active
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {route.label}
          </span>

          {route.active && (
            <motion.span
              className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
              layoutId="activeIndicator"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}

          <span className="absolute inset-0 z-0 rounded-md opacity-0 bg-orange-950/10 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
