"use server";

//* Only for authenticated users (ADMIN) */
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { NewsBillboardFormValues, NewsBillboardSchema } from "@/schema";
import { NewsBillboard, UserRole } from "@prisma/client";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

type UpsertBillboardType = NewsBillboard;

export default async function upsertBillboard(
  value: NewsBillboardFormValues,
  id?: number,
): Promise<UpsertBillboardType> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthenticated!!");
  }

  if (session.user.role !== UserRole.ADMIN) {
    throw new Error("Unauthenticated!!");
  }
  const validate = NewsBillboardSchema.safeParse(value);

  if (!validate.success) {
    throw new Error("Invalid Data!!");
  }

  const data = await prisma.newsBillboard.upsert({
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
