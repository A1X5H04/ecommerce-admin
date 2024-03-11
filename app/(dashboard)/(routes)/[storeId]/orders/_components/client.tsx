"use client";

import PageHeading from "@/components/page-heading";

import { OrderColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

function OrderClient({ data }: OrderClientProps) {
  return (
    <div className="flex-col">
      <div>
        <PageHeading
          title={`Orders (${data.length})`}
          description="Manage your orders here."
        />
        <Separator className="my-5" />
        <div className="flex-1">
          <DataTable columns={columns} data={data} filterKey="products" />
        </div>
      </div>
    </div>
  );
}

export default OrderClient;
