"use client";

import { useUser } from "@/context/UserContext";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserProfile = () => {
  const { user, logout } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    const roles: Record<string, string> = {
      admin:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      tutor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      student:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    };

    return (
      roles[role.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
  };

  return user ? (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 border-2 border-primary/20 transition-all duration-200 hover:border-primary/50">
          <AvatarImage src={user.profileImage} alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 border border-border/50 shadow-lg bg-card/95 backdrop-blur-sm"
      >
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="flex flex-col gap-1">
            <div className="font-medium">{user.name}</div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`text-xs px-2 py-0 h-5 ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 px-2 py-1.5 cursor-pointer"
        >
          <Link href="/profile">
            <User className="h-4 w-4 mr-2 text-primary" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 px-2 py-1.5 cursor-pointer"
        >
          <Link href={`/${user.role}`}>
            <LayoutDashboard className="h-4 w-4 mr-2 text-primary" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="outline" className="hidden sm:flex">
          Log In
        </Button>
      </Link>
      <Link href="/register-student">
        <Button className="bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-opacity">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default UserProfile;
