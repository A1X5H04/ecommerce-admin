"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

function CategoryForm({ initialData, billboards }: CategoryFormProps) {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const { edgestore } = useEdgeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (initialData) {
      const response = axios
        .patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/categories`);
        });

      toast.promise(response, {
        loading: "Updating Category...",
        success: "Category updated successfully.",
        error: "Failed to update Category.",
      });
    } else {
      const response = axios
        .post(`/api/${params.storeId}/categories`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/categories`);
        });

      toast.promise(response, {
        loading: "Creating Category...",
        success: "Category created successfully.",
        error: "Failed to create Category.",
      });
    }
  };

  const onDelete = () => {
    const response = axios
      .delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      .then(() => {
        router.refresh();
        router.push("/");
      });

    toast.promise(response, {
      loading: "Deleting Category...",
      success: "Category deleted successfully.",
      error: "Failed to delete Category",
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
              title={initialData ? "Edit Category" : "Create Category"}
              description={
                initialData ? "Edit your Category" : "Create a new Category"
              }
            />
            <div className="inline-flex gap-x-3 items-center">
              {initialData && (
                <Button
                  type="button"
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
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billboardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a billboard"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billboards.map((billboard) => (
                            <SelectItem key={billboard.id} value={billboard.id}>
                              {billboard.heading}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

export default CategoryForm;
