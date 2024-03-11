"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import AlertDialog from "@/components/dialogs/alert-dialog";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface ProductCellActionProps {
  data: ProductColumn;
}

function ProductCellAction({ data }: ProductCellActionProps) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      toast.success("Billboard deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ProductCellAction;
