"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
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

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  heading: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string(),
});

function BillboardForm({ initialData }: BillboardFormProps) {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      heading: "",
      content: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (initialData) {
      const response = axios
        .patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
        .then(() => {
          router.refresh();
        });

      toast.promise(response, {
        loading: "Updating Billboard...",
        success: "Billboard updated successfully.",
        error: "Failed to update Billboard.",
      });
    } else {
      const response = axios
        .post(`/api/${params.storeId}/billboards`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/billboards`);
        });

      toast.promise(response, {
        loading: "Creating Billboard...",
        success: "Billboard created successfully.",
        error: "Failed to create Billboard.",
      });
    }
  };

  const onDelete = () => {
    const response = axios
      .delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      .then(() => {
        router.refresh();
        router.push("/");
      });

    toast.promise(response, {
      loading: "Deleting Billboard...",
      success: "Billboard deleted successfully.",
      error: "Failed to delete Billboard",
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
              title={initialData ? "Edit Billboard" : "Create Billboard"}
              description={
                initialData ? "Edit your billboard" : "Create a new billboard"
              }
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
              <Button type="submit">{initialData ? "Update" : "Create"}</Button>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="px-6 space-y-5">
            <SingleImageDropzone
              className="w-full h-80"
              value={file}
              onChange={async (file) => {
                setFile(file);
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                  });
                  console.log("res", res);
                  form.setValue("imageUrl", res.url);
                }
              }}
            />

            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Heading</FormLabel>
                    <FormControl>
                      <Input placeholder="Billboard Sub Heading" {...field} />
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

export default BillboardForm;
