import React from "react";
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/page-heading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/(application)/categories/_components/columns";
import { payments } from "@/data/demo-data";
import Link from "next/link";

function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-10">
      <PageHeading
        heading="Categories"
        subheading="Manage your categories here"
      >
        <Button asChild>
          <Link href="/categories/create">Create Category</Link>
        </Button>
      </PageHeading>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}

export default Page;
