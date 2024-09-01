//* Doesn't requires authentication *//
"use server";

import {
  Image,
  Product,
  ProductCategory,
  ProductSubCategory,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";

type GetProductType = Product & {
  images: Image[];
  category: ProductCategory;
  subCategory: ProductSubCategory;
};

export default async function getProduct(id: number): Promise<GetProductType> {
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      category: true,
      subCategory: true,
    },
  });

  if (!data) throw 404;

  return data;
}
