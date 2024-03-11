import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
});

function StoreDialog() {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = axios
      .post("/api/stores", values)
      .then((res) => window.location.assign(`/${res.data.id}`))
      .catch((err) => {
        console.error(err);
      });

    toast.promise(response, {
      loading: "Creating store...",
      success: "Store created!",
      error: "Failed to create store.",
    });
  };

  return (
    <Modal
      title="Create Store"
      description="Create a new store."
      isOpen={storeModal.isOpen}
      onClose={storeModal.close}
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Shoe Store" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="pt-6 space-x-2 flex justify-end items-center">
              <Button
                variant="outline"
                type="button"
                onClick={storeModal.close}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Store
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export default StoreDialog;
