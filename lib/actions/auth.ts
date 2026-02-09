"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, signToken, setSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerAction(_prevState: { error: string } | null, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email already in use" };
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  const token = await signToken({ userId: user.id, role: user.role });
  await setSession(token);
  redirect("/");
}

export async function loginAction(_prevState: { error: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return { error: "Invalid email or password" };
  }

  const token = await signToken({ userId: user.id, role: user.role });
  await setSession(token);

  if (user.role === "ADMIN") {
    redirect("/admin");
  }
  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
