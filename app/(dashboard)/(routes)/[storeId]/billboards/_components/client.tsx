"use client";

import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex-col">
      <div>
        <div className="flex items-center justify-between">
          <PageHeading
            title={`Billboards (${data.length})`}
            description="Billboards are a great way to showcase your products and promotions."
          />
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          >
            Create Billboard
          </Button>
        </div>
        <Separator className="my-5" />
        <div className="flex-1">
          <DataTable columns={columns} data={data} filterKey="heading" />
        </div>
      </div>
      <PageHeading
        title="API"
        description="Endpoints for creating, updating, and deleting billboards."
      />
      <Separator className="my-5" />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
}

export default BillboardClient;
