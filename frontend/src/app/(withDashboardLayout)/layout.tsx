import AppSidebar from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Providers from "@/providers";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <Providers>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="p-4 pt-0 min-h-screen">{children}</div>
        </SidebarInset>
      </Providers>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
