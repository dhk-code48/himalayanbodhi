//* Doesn't requires authentication *//
"use server";

import { NewsBillboard } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetNewsAllBillboardsType = NewsBillboard[];

export default async function getNewsAllBillboards(): Promise<GetNewsAllBillboardsType> {
  const data = await prisma.newsBillboard.findMany({});

  return data;
}
