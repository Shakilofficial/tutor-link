import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-8">
        {children}
      </main>
      {/*   <Footer /> */}
    </div>
  );
};

export default MainLayout;
