"use client";

import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface SizeClientProps {
  data: SizeColumn[];
}

function SizeClient({ data }: SizeClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex-col">
      <div>
        <div className="flex items-center justify-between">
          <PageHeading
            title={`Sizes (${data.length})`}
            description="Sizes lets you change the size of your products"
          />
          <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
            Create Size
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="flex-1">
          <DataTable columns={columns} data={data} filterKey="name" />
        </div>
      </div>
      <PageHeading
        title="API"
        description="Endpoints for creating, updating, and deleting sizes."
      />
      <Separator className="my-5" />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  );
}

export default SizeClient;
