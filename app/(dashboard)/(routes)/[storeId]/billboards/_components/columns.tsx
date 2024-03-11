"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "./cell-action";

export type BillboardColumn = {
  id: string;
  heading: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <BillboardCellAction data={row.original} />,
  },
];
