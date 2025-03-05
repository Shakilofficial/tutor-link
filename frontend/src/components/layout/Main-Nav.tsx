"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "../shared/Logo";

interface Route {
  href: string;
  label: string;
  active: boolean;
}

interface MobileNavProps {
  routes: Route[];
  pathname: string;
}
const MainNav = ({ routes }: MobileNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Logo />
      <nav className="hidden gap-6 md:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainNav;
