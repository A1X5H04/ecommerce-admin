import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { ProductColumn } from "./_components/columns";
import ProductClient from "./_components/client";

async function ProductPage({ params }: { params: { storeId: string } }) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      color: true,
      size: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.featured,
    isArchived: item.archived,
    price: formatCurrency(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.name,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}

export default ProductPage;
