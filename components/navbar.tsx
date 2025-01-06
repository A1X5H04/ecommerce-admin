"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import AvatarSvgImage from "@/public/avatar.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

function Navbar() {
  const isMobile = useIsMobile();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14 ">
      <div className="w-full flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <>
              <SidebarTrigger className="-ml-1 w-9 h-9" />
              <Separator orientation="vertical" className="mr-2 h-7" />
            </>
          )}
          <Input placeholder="Search for anything" className="w-96" />
        </div>
        <Avatar className="size-8">
          <AvatarImage src={AvatarSvgImage.src} alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Navbar;
