"use server";

import { prisma } from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
}

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  await prisma.user.update({
    where: { id: session.userId },
    data: { name, phone },
  });

  return { success: true };
}

export async function changePasswordAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const newPassword = formData.get("newPassword") as string;
  if (!newPassword || newPassword.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const hashed = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: session.userId },
    data: { password: hashed },
  });

  return { success: true };
}
