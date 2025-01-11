"use client";

import React from "react";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { categorySchema, InferZodSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { categoryTypes } from "@/data/select-options";

function Page() {
  const form = useForm<InferZodSchema<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      parentCategoryId: "",
    },
  });

  const onFormSubmit = (value: InferZodSchema<typeof categorySchema>) => {
    // Handle Form Submission
    alert(JSON.stringify(value));
  };

  return (
    <div>
      <PageHeading heading="Add Category" subheading="Create a new category">
        <Button>Submit Form</Button>
      </PageHeading>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="grid grid-cols-3 gap-8">
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
              name="parentCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <FormControl>
                    <Input type="checkbox" placeholder="Hello" {...field} />
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
          </div>
          <div className="w-full mt-5 float-right">
            <Button>Submit Form</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Page;
