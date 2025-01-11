import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  iconUrl: z.string().optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),

  status: z.boolean().default(true),

  parentCategoryId: z.string().optional(),
  type: z.string(),
});

export type InferZodSchema<T extends z.ZodType> = z.infer<T>; // Helper to infer the schema type
