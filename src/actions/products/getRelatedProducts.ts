//* Doesn't requires authentication *//
"use server";

import { Image, Product } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetAllProductType = (Product & { images: Image[] })[];

export default async function getRelatedProducts({
  categoryId,
}: {
  categoryId: number;
}): Promise<GetAllProductType> {
  const data = await prisma.product.findMany({
    where: {
      categoryId,
    },
    take: 5,
    include: {
      images: true,
    },
  });

  if (!data) throw 404;

  return data;
}
