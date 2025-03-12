"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IUser } from "@/types";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  roles: string[];
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: MenuItem[];
  user: IUser | null;
}

const NavMain = ({ items, user }: NavMainProps) => {
  const [navData, setNavData] = useState<MenuItem[]>([]);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    if (user) {
      const filteredItems = items.filter((item) =>
        item.roles.includes(user.role)
      );
      setNavData(filteredItems);
    }
  }, [items, user]);

  if (!user) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {navData.map((item) => {
          const isActive = item.url && pathname.startsWith(item.url);
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                {item.url ? (
                  <Link
                    href={item.url}
                    className={`flex items-center space-x-2 p-2 rounded-md transition-all ${
                      isActive
                        ? "bg-orange-700/10 text-black dark:text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </div>
                )}
              </SidebarMenuButton>
              {item.items && item.items.length > 0 && (
                <SidebarMenuSub>
                  {item.items.map((subItem) => {
                    const isSubActive = pathname === subItem.url;
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={`block p-2 my-1 rounded-md ${
                              isSubActive
                                ? "bg-orange-700/50 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
