import prismadb from "@/lib/prismadb";
import ProductForm from "./_components/form";

interface BillbaordPageProps {
  params: {
    productId: string;
    storeId: string;
  };
}

async function ProductPage({ params }: BillbaordPageProps) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="max-w-6xl py-4 mt-6 mx-auto">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}

export default ProductPage;
