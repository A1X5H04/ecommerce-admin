import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./_components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="max-w-6xl py-4 mt-6 mx-auto">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;
