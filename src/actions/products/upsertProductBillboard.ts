"use server";

//* Only for authenticated users (ADMIN) */
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { ProductBillboardFormValues, ProductBillboardSchema } from "@/schema";
import { ProductBillboard, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UpsertProductBillboardType = ProductBillboard;

export default async function upsertProductBillboard(
  value: ProductBillboardFormValues,
  id?: number,
): Promise<UpsertProductBillboardType> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthenticated!!");
  }

  if (session.user.role !== UserRole.ADMIN) {
    throw new Error("Unauthenticated!!");
  }
  const validate = ProductBillboardSchema.safeParse(value);

  if (!validate.success) {
    throw new Error("Invalid Data!!");
  }

  const data = await prisma.productBillboard.upsert({
    where: {
      id: id || 0.5,
    },
    create: value,
    update: value,
  });

  if (!data) throw new Error("Unexpected error occurred!!");

  revalidatePath("/");

  return { ...data };
}
