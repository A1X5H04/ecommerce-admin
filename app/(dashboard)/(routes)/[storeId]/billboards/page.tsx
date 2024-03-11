import React from "react";
import BillboardClient from "./_components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./_components/columns";

async function BillboardsPage({ params }: { params: { storeId: string } }) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    heading: item.heading,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}

export default BillboardsPage;
