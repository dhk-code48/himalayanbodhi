"use server";

//* Only for authenticated users (ADMIN) */
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { NewsFormValues, NewsSchema } from "@/schema";
import { News, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UpsertNewsType = News;

export default async function upsertBillboard(
  value: NewsFormValues,
  id?: number,
): Promise<UpsertNewsType> {
  const session = await auth();

  if (!session) {
    throw 401;
  }

  if (session.user.role !== UserRole.ADMIN) {
    throw 403;
  }
  const validate = NewsSchema.safeParse(value);

  if (!validate.success) {
    throw 400;
  }

  const data = await prisma.news.upsert({
    where: {
      id: id || 0.5,
    },
    create: value,
    update: value,
  });

  if (!data) throw 500;

  revalidatePath("/");

  return { ...data };
}
