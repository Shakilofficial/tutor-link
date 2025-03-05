import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {/* <Sidebar className="w-[280px] hidden md:flex flex-col bg-gray-900 text-white" /> */}

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/*  <Navbar /> */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
