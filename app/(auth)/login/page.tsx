"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="pt-20 pb-8 px-7 text-center">
        <div className="w-16 h-16 bg-[#C67C4E] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-[24px] font-bold">JG</span>
        </div>
        <h1 className="text-[24px] font-bold text-[#2F2D2C]">Welcome Back</h1>
        <p className="text-[14px] text-[#9B9B9B] mt-1">Sign in to your account</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-t-3xl flex-1 px-7 pt-8">
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-50 text-red-600 text-[13px] px-4 py-3 rounded-xl">
              {state.error}
            </div>
          )}

          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#C67C4E] text-white font-semibold text-[16px] h-[56px] rounded-2xl active:scale-[0.98] transition-transform disabled:opacity-60 mt-2"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[14px] text-[#9B9B9B] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#C67C4E] font-semibold">
            Sign Up
          </Link>
        </p>

        <div className="mt-6 pt-4 border-t border-[#F4F4F4]">
          <p className="text-center text-[12px] text-[#9B9B9B] mb-3">Demo accounts</p>
          <div className="space-y-2 text-[12px] text-[#9B9B9B]">
            <p>Customer: <span className="text-[#2F2D2C]">jooklyn@email.com</span> / password123</p>
            <p>Admin: <span className="text-[#2F2D2C]">admin@javagem.com</span> / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
