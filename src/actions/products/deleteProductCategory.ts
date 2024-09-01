//* Requires authentication *//
"use server";

import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export default async function deleteProductCategory(id: number) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Unauthorized");
    }

    if (session.user.role !== UserRole.ADMIN) {
      throw new Error("Forbidden");
    }

    const data = await prisma.productCategory.delete({
      where: {
        id,
      },
    });

    if (!data) {
      throw new Error("Not Found");
    }

    return { error: false, data };
  } catch (error) {
    return { error: true };
  }
}
