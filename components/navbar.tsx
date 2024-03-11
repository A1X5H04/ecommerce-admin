import { UserButton, auth } from "@clerk/nextjs";

import NavLinks from "@/app/(dashboard)/_components/nav-links";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./mode.toggle";

async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b h-16 px-3 gap-x-5 flex items-center">
      <StoreSwitcher items={stores} />
      <NavLinks />
      <div className="ml-auto inline-flex items-center gap-x-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar;
