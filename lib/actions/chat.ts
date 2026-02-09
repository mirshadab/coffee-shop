"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function sendMessageAction(orderId: string, message: string) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const msg = await prisma.chatMessage.create({
    data: {
      orderId,
      senderId: session.userId,
      message,
    },
    include: { sender: { select: { id: true, name: true, role: true } } },
  });

  return { success: true, message: msg };
}

export async function getMessagesAction(orderId: string) {
  return prisma.chatMessage.findMany({
    where: { orderId },
    include: { sender: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function getOrderWithDelivery(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { product: true } },
      orderDelivery: { include: { agent: true } },
      user: { select: { name: true } },
    },
  });
}
