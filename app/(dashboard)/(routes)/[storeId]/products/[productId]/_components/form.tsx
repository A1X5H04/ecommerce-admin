"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Product, ProductImage, Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AlertDialog from "@/components/dialogs/alert-dialog";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/images-uploader";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  initialData:
    | (Product & {
        images: ProductImage[];
      })
    | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  featured: z.boolean().default(false).optional(),
  archived: z.boolean().default(false).optional(),
});

function ProductForm({
  initialData,
  categories,
  colors,
  sizes,
}: ProductFormProps) {
  const params = useParams();
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
        }
      : {
          name: "",
          description: "",
          images: [],
          price: 0,
          categoryId: "",
          sizeId: "",
          colorId: "",
          featured: false,
          archived: false,
        },
  });

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (initialData) {
      const response = axios
        .patch(`/api/${params.storeId}/products/${params.productId}`, data)
        .then(() => {
          router.refresh();
        });

      toast.promise(response, {
        loading: "Updating Product...",
        success: "Product updated successfully.",
        error: "Failed to update Product.",
      });
    } else {
      const response = axios
        .post(`/api/${params.storeId}/products`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/products`);
        });

      toast.promise(response, {
        loading: "Creating Product...",
        success: "Product created successfully.",
        error: "Failed to create Product.",
      });
    }
  };

  const onDelete = () => {
    const response = axios
      .delete(`/api/${params.storeId}/products/${params.productId}`)
      .then(() => {
        router.refresh();
        router.push("/");
      });

    toast.promise(response, {
      loading: "Deleting Product...",
      success: "Product deleted successfully.",
      error: "Failed to delete Product",
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
              title={initialData ? "Edit Product" : "Create Product"}
              description={
                initialData ? "Edit your Product" : "Create a new Product"
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
          <div className="px-6 space-y-2">
            <div className="space-y-3">
              <span className="text-sm font-medium">Images</span>
              <MultiImageDropzone
                className="w-full h-80"
                value={fileStates}
                dropzoneOptions={{
                  maxFiles: 5,
                }}
                onChange={(files) => {
                  setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                  await Promise.all(
                    addedFiles.map(async (addedFileState) => {
                      try {
                        const res = await edgestore.publicFiles.upload({
                          // @ts-ignore
                          file: addedFileState.file,
                          onProgressChange: async (progress) => {
                            updateFileProgress(addedFileState.key, progress);
                            if (progress === 100) {
                              // wait 1 second to set it to complete
                              // so that the user can see the progress bar at 100%
                              await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                              );
                              updateFileProgress(
                                addedFileState.key,
                                "COMPLETE"
                              );
                            }
                          },
                        });
                        form.setValue("images", [
                          ...form.getValues().images,
                          { url: res.url },
                        ]);
                      } catch (err) {
                        updateFileProgress(addedFileState.key, "ERROR");
                      }
                    })
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="A shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A white shirt with polka dots pattern"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
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
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
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
                              placeholder="Select a color"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              {color.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
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
                              placeholder="Select a size"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        Featured products will be displayed on the homepage
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="archived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        Archived products will be hidden from the store
                      </FormDescription>
                    </div>
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

export default ProductForm;
