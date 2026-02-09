"use client";

import { logoutAction } from "@/lib/actions/auth";

export default function SignOutButton() {
  return (
    <button
      onClick={() => logoutAction()}
      className="w-full h-[50px] border border-[#DEDEDE] rounded-2xl text-[14px] font-semibold text-[#C67C4E]"
    >
      Sign Out
    </button>
  );
}
