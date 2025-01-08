import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Navbar from "@/components/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="none" className="h-screen" />
      <div className="flex-1 max-w-7xl mx-auto p-5 sm:px-10">
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default Layout;
