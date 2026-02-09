"use server";

import { signToken, setSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const demoAccounts: Record<string, { name: string; role: string; password: string }> = {
  "jooklyn@email.com": { name: "Jooklyn Simmons", role: "CUSTOMER", password: "password123" },
  "admin@javagem.com": { name: "Admin", role: "ADMIN", password: "admin123" },
};

export async function registerAction(_prevState: { error: string } | null, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  const token = await signToken({ userId: "user-new", role: "CUSTOMER" });
  await setSession(token);
  redirect("/");
}

export async function loginAction(_prevState: { error: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required" };
  }

  const account = demoAccounts[email];
  if (account && account.password === password) {
    const token = await signToken({ userId: `demo-${email}`, role: account.role });
    await setSession(token);
    if (account.role === "ADMIN") redirect("/admin");
    redirect("/");
  }

  // Allow any email/password combo for demo
  const token = await signToken({ userId: "demo-user", role: "CUSTOMER" });
  await setSession(token);
  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
