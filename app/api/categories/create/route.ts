import { NextRequest, NextResponse } from "next/server";
import { InferZodSchema, categorySchema } from "@/lib/schema";
import db from "@/lib/db";
import { categories } from "@/db/schema";
import { generateSlug } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const {
    name,
    parentCategoryId,
    iconUrl,
    status,
    metaTitle,
    metaDescription,
    metaKeywords,
  }: InferZodSchema<typeof categorySchema> = await req.json();

  // Create category

  try {
    await db.insert(categories).values({
      name,
      parentId: parentCategoryId,
      iconUrl: iconUrl || null,
      slug: generateSlug(name),
      status,
      metadata: {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
      },
    });
  } catch (error) {
    console.log("POST Route Handler (/categories/create): Error - ", error);
    return new NextResponse("Failed to create category", { status: 500 });
  }
}
