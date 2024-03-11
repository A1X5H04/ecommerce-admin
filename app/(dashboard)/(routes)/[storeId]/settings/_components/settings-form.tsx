"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
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
import ApiAlert from "@/components/api-alert";
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

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

function SettingsForm({ initialData }: SettingsFormProps) {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const response = axios
      .patch(`/api/stores/${params.storeId}`, data)
      .then(() => router.refresh());

    toast.promise(response, {
      loading: "Updating store...",
      success: "Store updated successfully.",
      error: "Failed to update store.",
    });
  };

  const onDelete = () => {
    const response = axios.delete(`/api/stores/${params.storeId}`).then(() => {
      router.refresh();
      router.push("/");
    });

    toast.promise(response, {
      loading: "Deleting store...",
      success: "Store deleted successfully.",
      error:
        "Failed to delete store, make sure to delete all products and categories.",
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
              title="Store Settings"
              description="Manage your store settings."
            />
            <div className="inline-flex gap-x-3 items-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => setIsOpen(true)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="px-6">
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      <Separator className="my-5" />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
}

export default SettingsForm;
