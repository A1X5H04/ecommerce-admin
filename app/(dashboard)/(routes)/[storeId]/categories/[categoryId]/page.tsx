import prismadb from "@/lib/prismadb";
import CategoryForm from "./_components/form";

interface CategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="max-w-6xl py-4 mt-6 mx-auto">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}

export default CategoryPage;
