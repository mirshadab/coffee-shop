"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getAdminStats() {
  await requireAdmin();

  const [totalOrders, pendingOrders, totalProducts, totalUsers, totalRevenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.product.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    totalProducts,
    totalUsers,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  };
}

export async function getAllOrders() {
  await requireAdmin();

  return prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: true } },
      orderDelivery: { include: { agent: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  await requireAdmin();

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return { success: true };
}

export async function assignAgentAction(orderId: string, agentId: string) {
  await requireAdmin();

  const existing = await prisma.orderDelivery.findUnique({ where: { orderId } });

  if (existing) {
    await prisma.orderDelivery.update({
      where: { orderId },
      data: { agentId },
    });
  } else {
    await prisma.orderDelivery.create({
      data: { orderId, agentId },
    });
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "OUT_FOR_DELIVERY" },
  });

  return { success: true };
}

export async function getAllAgents() {
  await requireAdmin();
  return prisma.deliveryAgent.findMany();
}

export async function createAgentAction(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  if (!name || !phone) return { error: "Name and phone are required" };

  await prisma.deliveryAgent.create({ data: { name, phone } });
  return { success: true };
}

export async function toggleAgentAvailability(agentId: string) {
  await requireAdmin();

  const agent = await prisma.deliveryAgent.findUnique({ where: { id: agentId } });
  if (!agent) return { error: "Agent not found" };

  await prisma.deliveryAgent.update({
    where: { id: agentId },
    data: { available: !agent.available },
  });

  return { success: true };
}

export async function getAllProducts() {
  await requireAdmin();
  return prisma.product.findMany({ orderBy: { name: "asc" } });
}

export async function updateProductAction(productId: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const available = formData.get("available") === "true";

  await prisma.product.update({
    where: { id: productId },
    data: { name, price, available },
  });

  return { success: true };
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const image = (formData.get("image") as string) || "/images/caffe-mocha.jpg";

  if (!name || !price) return { error: "Name and price are required" };

  await prisma.product.create({
    data: { name, subtitle, description, price, category, image, rating: 4.5, reviews: 0 },
  });

  return { success: true };
}
