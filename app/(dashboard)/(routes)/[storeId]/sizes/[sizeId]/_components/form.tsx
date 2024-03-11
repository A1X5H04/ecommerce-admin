"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AlertDialog from "@/components/dialogs/alert-dialog";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOrigin } from "@/hooks/use-origin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SingleImageDropzone } from "@/components/image-uploader";
import { useEdgeStore } from "@/lib/edgestore";

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

function SizeForm({ initialData }: SizeFormProps) {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (initialData) {
      const response = axios
        .patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/sizes`);
        });

      toast.promise(response, {
        loading: "Updating Size...",
        success: "Size updated successfully.",
        error: "Failed to update Size.",
      });
    } else {
      const response = axios
        .post(`/api/${params.storeId}/sizes`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/sizes`);
        });

      toast.promise(response, {
        loading: "Creating Size...",
        success: "Size created successfully.",
        error: "Failed to create Size.",
      });
    }
  };

  const onDelete = () => {
    const response = axios
      .delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      .then(() => {
        router.refresh();
        router.push("/");
      });

    toast.promise(response, {
      loading: "Deleting Size...",
      success: "Size deleted successfully.",
      error: "Failed to delete Size",
    });
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={false}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex items-center justify-between mb-3 px-6">
            <PageHeading
              title={initialData ? "Edit Size" : "Create Size"}
              description={initialData ? "Edit your size" : "Create a new size"}
            />
            <div className="inline-flex gap-x-3 items-center">
              {initialData && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setIsOpen(true)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              <Button type="submit">
                {initialData ? "Update Size" : "Create Size"}
              </Button>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="px-6 space-y-5">
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Extra Large" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder="XL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SizeForm;
