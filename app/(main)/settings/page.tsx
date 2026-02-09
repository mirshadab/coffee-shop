"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { ChevronLeftIcon } from "@/components/icons";
import { updateProfileAction, changePasswordAction } from "@/lib/actions/user";
import { useToast } from "@/lib/context/ToastContext";

export default function SettingsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleProfileUpdate = async (_prev: unknown, formData: FormData) => {
    const result = await updateProfileAction(formData);
    if (result.success) showToast("Profile updated");
    return result;
  };

  const handlePasswordChange = async (_prev: unknown, formData: FormData) => {
    const result = await changePasswordAction(formData);
    if (result.success) showToast("Password changed");
    else if (result.error) showToast(result.error, "error");
    return result;
  };

  const [, profileAction, profilePending] = useActionState(handleProfileUpdate, null);
  const [passwordState, passwordAction, passwordPending] = useActionState(handlePasswordChange, null);

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
        <form action={profileAction} className="space-y-4 mb-8">
          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>
          <div>
            <label className="text-[13px] font-medium text-[#2F2D2C] mb-1.5 block">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="Your phone number"
              className="w-full h-[50px] border border-[#DEDEDE] rounded-xl px-4 text-[14px] text-[#2F2D2C] placeholder:text-[#9B9B9B] outline-none focus:border-[#C67C4E] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={profilePending}
            className="w-full bg-[#C67C4E] text-white font-semibold text-[14px] h-[48px] rounded-2xl disabled:opacity-60"
          >
            {profilePending ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="h-px bg-[#EAEAEA] mb-6" />

        {/* Password Section */}
        <h3 className="text-[16px] font-semibold text-[#2F2D2C] mb-4">Change Password</h3>
        <form action={passwordAction} className="space-y-4">
          {passwordState?.error && (
            <div className="bg-red-50 text-red-600 text-[13px] px-4 py-3 rounded-xl">{passwordState.error}</div>
          )}
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
            disabled={passwordPending}
            className="w-full border border-[#C67C4E] text-[#C67C4E] font-semibold text-[14px] h-[48px] rounded-2xl disabled:opacity-60"
          >
            {passwordPending ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
