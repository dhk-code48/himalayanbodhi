//* Doesn't requires authentication *//
"use server";

import { NewsBillboard, NewsCategory } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetAllNewsCategoriesType = (NewsCategory & { billboard: NewsBillboard })[];

export default async function getAllNewsCategories(): Promise<GetAllNewsCategoriesType> {
  const data = await prisma.newsCategory.findMany({
    include: {
      billboard: true,
    },
  });

  if (!data) throw new Error("News Categories not found");

  return data;
}
