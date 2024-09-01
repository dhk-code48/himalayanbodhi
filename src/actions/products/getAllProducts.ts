//* Doesn't requires authentication *//
"use server";

import { Image, Product } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";

type GetAllProductType = (Product & { images: Image[] })[];

export default async function getAllProducts(): Promise<
  (Product & { images: Image[] })[]
> {
  const data = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  if (!data) throw 404;

  return data;
}
