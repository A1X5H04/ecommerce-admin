"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "./action";

export type CatergoryColumn = {
  id: string;
  name: string;
  billboardHeading: string;
  createdAt: string;
};

export const columns: ColumnDef<CatergoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardHeading,
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
