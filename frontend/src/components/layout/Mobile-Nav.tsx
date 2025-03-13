"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, GraduationCap, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

const MobileNav = ({ routes }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="lg:hidden p-0 h-9 w-9 rounded-full"
          size="icon"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-l border-border/50 p-0 w-[380px] md:max-w-sm"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-4 border-b border-border/50 flex justify-between items-center">
            <SheetTitle className="text-left text-lg font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              <Logo />
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-auto py-6 px-6">
            <nav className="flex flex-col space-y-1">
              {routes.map((route, index) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "flex items-center justify-between py-3 px-4 rounded-md transition-colors",
                      route.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-accent"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span>{route.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {user && (
              <div className="mt-8 border-t border-border/50 pt-6">
                <div className="px-4 mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Account
                  </h3>
                </div>
                <nav className="flex flex-col space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center py-3 px-4 rounded-md transition-colors hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    <span>Profile</span>
                  </Link>
                  <Link
                    href={`/${user.role}`}
                    className="flex items-center py-3 px-4 rounded-md transition-colors hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center py-3 px-4 rounded-md transition-colors hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    <span>Settings</span>
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          {!user && (
            <div className="border-t border-border/50 p-6 bg-accent/30">
              <div className="grid gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-opacity"
                >
                  <Link href="/register-student" onClick={() => setOpen(false)}>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Sign up as Student
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <Link href="/register-tutor" onClick={() => setOpen(false)}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Sign up as Tutor
                  </Link>
                </Button>
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
