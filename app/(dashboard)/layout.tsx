import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
