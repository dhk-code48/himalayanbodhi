"use server";

//* Only for authenticated users (ADMIN) */
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  ProductSubCategoryFormValues,
  ProductSubCategorySchema,
} from "@/schema";
import { ProductSubCategory, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UpsertProductSubCategoryType = ProductSubCategory;

export default async function upsertProductSubCategory(
  value: ProductSubCategoryFormValues,
  id?: number,
): Promise<UpsertProductSubCategoryType> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthenticated!!");
  }

  if (session.user.role !== UserRole.ADMIN) {
    throw new Error("Unauthenticated!!");
  }
  const validate = ProductSubCategorySchema.safeParse(value);

  if (!validate.success) {
    throw new Error("Invalid Data!!");
  }

  const data = await prisma.productSubCategory.upsert({
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
