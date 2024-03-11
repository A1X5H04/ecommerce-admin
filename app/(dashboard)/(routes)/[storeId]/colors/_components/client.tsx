"use client";

import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface ColorClientProps {
  data: ColorColumn[];
}

function ColorClient({ data }: ColorClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex-col">
      <div>
        <div className="flex items-center justify-between">
          <PageHeading
            title={`Colors (${data.length})`}
            description="Colors lets you change the color of your products"
          />
          <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
            Create Color
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

export default ColorClient;
