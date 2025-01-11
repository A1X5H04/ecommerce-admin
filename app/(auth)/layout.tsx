import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full grid place-items-center">
      <div>{children}</div>
    </div>
  );
}

export default Layout;
