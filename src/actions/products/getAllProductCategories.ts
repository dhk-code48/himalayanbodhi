//* Doesn't requires authentication *//
"use server";

import {
  ProductBillboard,
  ProductCategory,
  ProductSubCategory,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetAllProductCategoriesType = (ProductCategory & {
  billboard: ProductBillboard;
  subCategories: ProductSubCategory[];
})[];

export default async function getAllProductCategories({
  subCategories,
  billboard,
}: {
  subCategories?: boolean;
  billboard?: boolean;
}): Promise<GetAllProductCategoriesType> {
  const data = await prisma.productCategory.findMany({
    include: {
      billboard,
      subCategories,
    },
  });

  if (!data) throw new Error("Product Categories not found");

  return data;
}
