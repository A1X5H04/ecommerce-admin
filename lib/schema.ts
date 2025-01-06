import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  parentCategoryId: z.string().optional(),
  type: z.string(),
});

export type InferZodSchema<T extends z.ZodType> = z.infer<T>; // Helper to infer the schema type
