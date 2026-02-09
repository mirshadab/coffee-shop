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

  try {
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
  } catch (e) {
    // Re-throw Next.js redirect errors
    if (e && typeof e === "object" && "digest" in e) throw e;
    console.error("Register error:", e);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function loginAction(_prevState: { error: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required" };
  }

  try {
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
  } catch (e) {
    // Re-throw redirects (Next.js uses thrown NEXT_REDIRECT)
    // Re-throw Next.js redirect errors
    if (e && typeof e === "object" && "digest" in e) throw e;
    console.error("Login error:", e);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
