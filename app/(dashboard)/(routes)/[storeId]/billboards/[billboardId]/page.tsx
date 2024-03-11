import prismadb from "@/lib/prismadb";
import BillboardForm from "./_components/form";

interface BillbaordPageProps {
  params: {
    billboardId: string;
  };
}

async function BillboardPage({ params }: BillbaordPageProps) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="max-w-6xl py-4 mt-6 mx-auto">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}

export default BillboardPage;
