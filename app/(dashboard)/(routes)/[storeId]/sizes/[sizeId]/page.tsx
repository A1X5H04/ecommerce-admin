import prismadb from "@/lib/prismadb";
import SizeForm from "./_components/form";

interface SizePageProps {
  params: {
    sizeId: string;
  };
}

async function SizePage({ params }: SizePageProps) {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="max-w-6xl py-4 mt-6 mx-auto">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;
