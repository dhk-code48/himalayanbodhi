//* Doesn't requires authentication *//
"use server";

import { News } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetAllNewsType = News[];

export default async function getAllNews({
  take,
}: {
  take?: number;
}): Promise<GetAllNewsType> {
  const data = await prisma.news.findMany({
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
