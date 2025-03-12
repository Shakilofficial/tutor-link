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
import { useEffect, useState } from "react";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  roles: string[];
  isActive?: boolean;
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
        {navData.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="text-lg font-semibold text-orange-700"
          >
            <SidebarMenuButton asChild tooltip={item.title}>
              {item.url ? (
                <Link href={item.url} className="flex items-center space-x-2">
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
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <Link href={subItem.url}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
