"use client";
import { MoonIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import MainNav from "./Main-Nav";
import MobileNav from "./Mobile-Nav";

const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/tutors",
      label: "Browser Tutors",
      active: pathname === "/tutors",
    },
    {
      href: "/blogs",
      label: "blogs",
      active: pathname === "/blogs",
    },
    {
      href: "/about-us",
      label: "About US",
      active: pathname === "/about-us",
    },
  ];
  return (
    <div className="container flex h-16 items-center justify-between w-full mx-auto px-4">
      <MainNav routes={routes} pathname={pathname} />
      <div className="flex items-center gap-2">
        <MoonIcon />
        <div className="hidden md:flex md:gap-2">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Log in</Link>
          </Button>
        </div>
        <MobileNav routes={routes} pathname={pathname} />
      </div>
    </div>
  );
};

export default Navbar;
