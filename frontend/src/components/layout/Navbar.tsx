"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import ThemeToggle from "../shared/ThemeToggle";
import UserProfile from "../shared/UserProfile";
import MainNav from "./Main-Nav";
import MobileNav from "./Mobile-Nav";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
      href: "/about-us",
      label: "ABOUT US",
      active: pathname === "/about-us",
    },
    {
      href: "/faq",
      label: "FAQ",
      active: pathname === "/faq",
    },
    {
      href: "/blogs",
      label: "BLOGS",
      active: pathname === "/blogs",
    },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between w-full mx-auto px-4">
        <div className="flex items-center">
          <Logo />
        </div>

        <MainNav routes={routes} pathname={pathname} />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserProfile />
          <MobileNav routes={routes} pathname={pathname} />
        </div>
      </div>

      <div
        className={`h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.header>
  );
};

export default Navbar;
