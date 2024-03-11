import React from "react";
import prismadb from "@/lib/prismadb";
import { CatergoryColumn } from "./_components/columns";
import CategoryClient from "./_components/client";

async function CategoryPage({ params }: { params: { storeId: string } }) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CatergoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardHeading: item.billboard.heading,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}

export default CategoryPage;
