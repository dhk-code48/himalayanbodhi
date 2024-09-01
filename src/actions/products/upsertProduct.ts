"use server";

//* Only for authenticated users (ADMIN) */
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { ProductFormValues, ProductSchema } from "@/schema";
import { Product, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UpsertProductType = Product;

export default async function upsertProduct(
  value: ProductFormValues,
  id?: number,
): Promise<UpsertProductType> {
  const session = await auth();

  if (!session) {
    throw 401;
  }

  if (session.user.role !== UserRole.ADMIN) {
    throw 403;
  }
  const validate = ProductSchema.safeParse(value);

  if (!validate.success) {
    throw 400;
  }

  if (id) {
    await prisma.image.deleteMany({
      where: { productId: id },
    });
  }

  console.log("CONTENT => ", value.content);

  const imageData = value.images.map((image: { url: string }) => image);

  const data = await prisma.product.upsert({
    where: {
      id: id || 0.5,
    },
    create: {
      ...value,
      images: { createMany: { data: imageData } },
    },
    update: {
      ...value,
      images: { createMany: { data: imageData } },
    },
  });

  if (!data) throw 500;

  revalidatePath("/");

  return { ...data };
}
