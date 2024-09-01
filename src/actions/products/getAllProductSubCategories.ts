//* Doesn't requires authentication *//
"use server";

import { ProductSubCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetAllProductSubCategoriesType = ProductSubCategory[];

export default async function getAllProductSubCategories(): Promise<GetAllProductSubCategoriesType> {
  const data = await prisma.productSubCategory.findMany();

  if (!data) throw new Error("Product SubCategories not found");

  return data;
}
