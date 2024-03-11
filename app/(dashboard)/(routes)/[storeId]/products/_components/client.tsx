"use client";

import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex-col">
      <div>
        <div className="flex items-center justify-between">
          <PageHeading
            title={`Products (${data.length})`}
            description="Products are the items that you sell in your store."
          />
          <Button
            onClick={() => router.push(`/${params.storeId}/products/new`)}
          >
            Create Billboard
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="flex-1">
          <DataTable columns={columns} data={data} filterKey="name" />
        </div>
      </div>
      <PageHeading
        title="API"
        description="Endpoints for creating, updating, and deleting products."
      />
      <Separator className="my-5" />
      <ApiList entityName="products" entityIdName="productId" />
    </div>
  );
}

export default ProductClient;
