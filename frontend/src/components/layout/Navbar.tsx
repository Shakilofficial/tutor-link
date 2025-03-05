"use client";
import { usePathname } from "next/navigation";
import Logo from "../shared/Logo";
import ThemeToggle from "../shared/ThemeToggle";
import UserProfile from "../shared/UserProfile";
import MainNav from "./Main-Nav";
import MobileNav from "./Mobile-Nav";

const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      href: "/",
      label: "HOME",
      active: pathname === "/",
    },
    {
      href: "/tutors",
      label: "BROWSE TUTORS",
      active: pathname === "/tutors",
    },
    {
      href: "/blogs",
      label: "BLOGS",
      active: pathname === "/blogs",
    },
    {
      href: "/about-us",
      label: "ABOUT US",
      active: pathname === "/about-us",
    },
  ];

  return (
    <div className="container flex h-16 items-center justify-between w-full mx-auto px-4 bg-transparent border-b border-orange-900/10">
      <Logo />
      <MainNav routes={routes} pathname={pathname} />
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <UserProfile />

        <MobileNav routes={routes} pathname={pathname} />
      </div>
    </div>
  );
};

export default Navbar;
