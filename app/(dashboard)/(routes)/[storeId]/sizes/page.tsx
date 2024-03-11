import React from "react";
import BillboardClient from "./_components/client";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./_components/columns";

async function SizesPage({ params }: { params: { storeId: string } }) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillboardClient data={formattedSizes} />
      </div>
    </div>
  );
}

export default SizesPage;
