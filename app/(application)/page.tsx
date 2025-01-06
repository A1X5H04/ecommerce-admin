
import React from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center">
          <SidebarTrigger className="-ml-1" />
        <h1 className="text-4xl font-bold">Hello, world!</h1>
        <p className="mt-4 text-lg">This is a Next.js app with Tailwind CSS.</p>
      </div>
  );
}
