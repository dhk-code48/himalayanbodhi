//* Requires authentication *//
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export default async function deleteProduct(id: number) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Unauthorized");
    }

    if (session.user.role !== UserRole.ADMIN) {
      throw new Error("Forbidden");
    }

    const data = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!data) {
      throw new Error("Not Found");
    }

    revalidatePath("/");
    return { error: false, data };
  } catch (error) {
    return { error: true };
  }
}
