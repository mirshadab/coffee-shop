"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/icons";
import { useToast } from "@/lib/context/ToastContext";

export default function SettingsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="flex items-center justify-between px-7 pt-16 pb-4">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Settings</h1>
        <div className="w-10" />
      </div>

      <div className="bg-white rounded-t-3xl px-7 pt-6 pb-8">
        {/* Profile Section */}
        <h3 className="text-[16px] font-semibold text-[#2F2D2C] mb-4">Edit Profile</h3>
        <form onSubmit={(e) => { e.preventDefault(); showToast("Profile updated"); }} className="space-y-4 mb-8">
          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">Full Name</label>
            <input
              name="name"
              type="text"
              defaultValue="Jooklyn Simmons"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>
          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">Phone</label>
            <input
              name="phone"
              type="tel"
              defaultValue="+1987654321"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C67C4E] text-white font-semibold text-[14px] h-[48px] rounded-2xl"
          >
            Save Changes
          </button>
        </form>

        <div className="h-px bg-[#EAEAEA] mb-6" />

        {/* Password Section */}
        <h3 className="text-[16px] font-semibold text-[#2F2D2C] mb-4">Change Password</h3>
        <form onSubmit={(e) => { e.preventDefault(); showToast("Password changed"); }} className="space-y-4">
          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Min 6 characters"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-[#C67C4E] text-[#C67C4E] font-semibold text-[14px] h-[48px] rounded-2xl"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
