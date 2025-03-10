"use client";

import Logo from "@/components/shared/Logo";
import UserProfile from "@/components/shared/UserProfile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { SquareTerminal } from "lucide-react";
import NavMain from "./NavMain";

const navData = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: SquareTerminal,
    roles: ["admin"],
    items: [
      { title: "User Management", url: "/admin/users" },
      { title: "Student Management", url: "/admin/students" },
      { title: "Tutor Management", url: "/admin/tutors" },
      { title: "Booking Management", url: "/admin/bookings" },
      { title: "Blogs Management", url: "/admin/blogs" },
      { title: "Review Management", url: "/admin/reviews" },
    ],
  },
  {
    title: "Tutor Dashboard",
    url: "/tutor",
    icon: SquareTerminal,
    roles: ["tutor"],
    items: [{ title: "Booking Requests", url: "/tutor/bookings" }],
  },
  {
    title: "Student Dashboard",
    url: "/student",
    icon: SquareTerminal,
    roles: ["student"],
    items: [{ title: "My Bookings", url: "/student/bookings" }],
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-center">
                <Logo />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user && <NavMain items={navData} user={user} />}
      </SidebarContent>
      <SidebarFooter>
        <div>
          <UserProfile />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
