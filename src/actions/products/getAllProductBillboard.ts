//* Doesn't requires authentication *//
"use server";

import { ProductBillboard } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetProductAllBillboardsType = ProductBillboard[];

export default async function getAllProductBillboards(): Promise<GetProductAllBillboardsType> {
  const data = await prisma.productBillboard.findMany({});

  if (!data) throw 404;

  return data;
}
