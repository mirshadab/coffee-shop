"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    localStorage.setItem("onboarded", "true");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="relative flex-1 min-h-[60vh]">
        <Image
          src="/images/promo-coffee.jpg"
          alt="Coffee"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0C0F14]" />
      </div>

      {/* Content */}
      <div className="bg-[#0C0F14] px-7 pb-12 pt-2 text-center">
        <h1 className="text-[34px] font-bold text-white leading-tight">
          Coffee so good, <br />
          your taste buds <br />
          will love it.
        </h1>
        <p className="text-[14px] text-[#A2A2A2] mt-3 leading-relaxed">
          The best grain, the finest roast, the <br />
          powerful flavor.
        </p>
        <button
          onClick={handleGetStarted}
          className="w-full bg-[#C67C4E] text-white font-semibold text-[16px] h-[56px] rounded-2xl mt-6 active:scale-[0.98] transition-transform"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
