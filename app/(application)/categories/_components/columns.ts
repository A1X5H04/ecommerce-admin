"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "@/data/demo-data";

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
];
