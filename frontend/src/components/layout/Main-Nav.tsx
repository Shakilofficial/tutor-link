"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
    <nav className="hidden gap-6 md:flex">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-orange-500" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
