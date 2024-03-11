"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  total: string;
  product: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isPaid",
    header: "Paid Status",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "total",
    header: "Total Price",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
