"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
          aria-label="Open mobile menu"
        >
          <Menu className="h-10 w-10 text-orange-600" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-orange-900/40">
        <div className="grid gap-6 py-10 px-8">
          {/* Header */}
          <SheetHeader className="sr-only">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>Mobile-Nav</SheetDescription>
          </SheetHeader>

          {/* Navigation Links */}
          <div className="grid gap-3 justify-center items-center">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-orange-600" : "text-muted-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="grid gap-2">
            <Button asChild>
              <Link href="/register-student" onClick={() => setOpen(false)}>
                Sign up as Student
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register-tutor" onClick={() => setOpen(false)}>
                Sign up as Tutor
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
