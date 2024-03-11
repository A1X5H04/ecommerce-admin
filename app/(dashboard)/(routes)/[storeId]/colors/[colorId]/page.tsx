import prismadb from "@/lib/prismadb";
import ColorForm from "./_components/form";

interface ColorPageProps {
  params: {
    colorId: string;
  };
}

async function ColorPage({ params }: ColorPageProps) {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="max-w-6xl py-4 mt-6 mx-auto">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}

export default ColorPage;
