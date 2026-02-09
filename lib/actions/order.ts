"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface PlaceOrderInput {
  items: {
    productId: string;
    quantity: number;
    size: string;
    price: number;
  }[];
  deliveryMethod: "DELIVER" | "PICKUP";
  address?: string;
  note?: string;
}

export async function placeOrderAction(input: PlaceOrderInput) {
  const session = await getSession();
  if (!session) {
    return { error: "Not authenticated" };
  }

  const deliveryFee = input.deliveryMethod === "DELIVER" ? 1.0 : 0;
  const itemsTotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = itemsTotal + deliveryFee;

  const order = await prisma.order.create({
    data: {
      userId: session.userId,
      deliveryMethod: input.deliveryMethod,
      address: input.address || "Jl. Kpg Sutoyo No. 620, Bilzen, Tanjungbalai",
      totalAmount,
      deliveryFee,
      note: input.note,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });

  return { success: true, orderId: order.id };
}

export async function getUserOrders() {
  const session = await getSession();
  if (!session) return [];

  return prisma.order.findMany({
    where: { userId: session.userId },
    include: {
      items: { include: { product: true } },
      orderDelivery: { include: { agent: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
