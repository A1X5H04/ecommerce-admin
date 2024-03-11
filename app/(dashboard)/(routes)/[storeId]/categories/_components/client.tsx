"use client";

import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { CatergoryColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface CategoryClientProps {
  data: CatergoryColumn[];
}

function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex-col">
      <div>
        <div className="flex items-center justify-between">
          <PageHeading
            title={`Categories (${data.length})`}
            description="Categories are a great way to organize your billboards."
          />
          <Button
            onClick={() => router.push(`/${params.storeId}/categories/new`)}
          >
            Create Category
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="flex-1">
          <DataTable columns={columns} data={data} filterKey="name" />
        </div>
      </div>
      <PageHeading
        title="API"
        description="Endpoints for creating, updating, and deleting billboards."
      />
      <Separator className="my-5" />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  );
}

export default CategoryClient;
