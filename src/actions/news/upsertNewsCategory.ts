"use server";

//* Only for authenticated users (ADMIN) */
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { NewsCategoryFormValues, NewsCategorySchema } from "@/schema";
import { NewsCategory, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UpsertCategoryType = NewsCategory;

export default async function upsertNewsCategory(
  value: NewsCategoryFormValues,
  id?: number,
): Promise<UpsertCategoryType> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthenticated access denied!");
  }
  if (session.user.role !== UserRole.ADMIN) {
    throw new Error("Unauthenticated access denied!");
  }

  const validate = NewsCategorySchema.safeParse(value);

  if (!validate.success) {
    throw new Error("Invalid Data!");
  }

  const data = await prisma.newsCategory.upsert({
    where: {
      id: id || 0.5,
    },
    create: value,
    update: value,
  });

  if (!data) throw new Error("Unexpected error ocurred!!");

  revalidatePath("/");

  return { ...data };
}
