"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({
    where: { available: true },
    orderBy: { name: "asc" },
  });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id } });
}
