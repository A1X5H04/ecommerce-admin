"use client";

import React from "react";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { categorySchema, InferZodSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categoryTypes } from "@/data/select-options";
import FormGroup from "@/components/form-group";
import ImageUpload from "@/components/image-upload";

function Page() {
  const form = useForm<InferZodSchema<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      iconUrl: "",
      parentCategoryId: "",
      status: true,
    },
  });

  const onFormSubmit = (value: InferZodSchema<typeof categorySchema>) => {
    // Handle Form Submission
    alert(JSON.stringify(value));
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onFormSubmit)}>
        <PageHeading heading="Add Category" subheading="Create a new category">
          <div>
            <Button>Create</Button>
          </div>
        </PageHeading>
        <div className="w-full grid grid-cols-2 gap-2">
          <FormGroup
            heading="Basic Info"
            className="grid-cols-1"
            rootClassName=""
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Men's Wear" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryTypes.map((categoryType) => (
                        <SelectItem
                          key={categoryType.id}
                          value={categoryType.id}
                        >
                          {categoryType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Status</FormLabel>
                    <FormDescription>
                      Enable or disable this category
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroup>
          <FormGroup heading="Media" rootClassName="col-span-1">
            <FormField
              control={form.control}
              name="iconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Banner</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange(undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGroup>
        </div>
        <FormGroup
          heading="Meta Information"
          description="This information will be used for SEO purposes"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="Men's Wear at [Store Name]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Get all the latest mens garment at [store name]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mens wear, kurta, shirts, t-shirts"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Separate each keyword with a comma (,)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
      </form>
    </Form>
  );
}

export default Page;
