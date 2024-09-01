//* Doesn't requires authentication *//
"use server";

import { NewsBillboard, NewsCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetNewsCategoriesType = (NewsCategory & { billboard: NewsBillboard })[];

export default async function getNewsCategories(): Promise<GetNewsCategoriesType> {
  const data = await prisma.newsCategory.findMany({
    include: {
      billboard: true,
    },
  });

  if (!data) throw new Error("News Categories not found");

  return data;
}
