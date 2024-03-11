"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, "Value must be valid hex code"),
});

function ColorForm({ initialData }: ColorFormProps) {
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
        .patch(`/api/${params.storeId}/colors/${params.ColorId}`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/colors`);
        });

      toast.promise(response, {
        loading: "Updating Color...",
        success: "Color updated successfully.",
        error: "Failed to update Color.",
      });
    } else {
      const response = axios
        .post(`/api/${params.storeId}/colors`, data)
        .then(() => {
          router.refresh();
          router.push(`/${params.storeId}/colors`);
        });

      toast.promise(response, {
        loading: "Creating Color...",
        success: "Color created successfully.",
        error: "Failed to create Color.",
      });
    }
  };

  const onDelete = () => {
    const response = axios
      .delete(`/api/${params.storeId}/colors/${params.ColorId}`)
      .then(() => {
        router.refresh();
        router.push("/");
      });

    toast.promise(response, {
      loading: "Deleting Color...",
      success: "Color deleted successfully.",
      error: "Failed to delete Color",
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
              title={initialData ? "Edit Color" : "Create Color"}
              description={
                initialData ? "Edit your Color" : "Create a new Color"
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
              <Button type="submit">
                {initialData ? "Update Color" : "Create Color"}
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
                      <Input placeholder="Red" {...field} />
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
                      <div className="flex items-center gap-x-4">
                        <Input placeholder="#FF0000" {...field} />
                        <div
                          className="border-2 h-4 w-4 rounded-full"
                          style={{
                            backgroundColor: field.value,
                          }}
                        />
                      </div>
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

export default ColorForm;
