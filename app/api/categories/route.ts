import db from "@/lib/db";
import { categories } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const categoriesResult = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories);

  return NextResponse.json(categoriesResult);
}
