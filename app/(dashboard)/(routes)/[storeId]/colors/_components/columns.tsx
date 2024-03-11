"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "./cell-action";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div
        className=" w-4 h-4 rounded-full border-2"
        style={{
          backgroundColor: row.original.value,
        }}
      />
    ),
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
