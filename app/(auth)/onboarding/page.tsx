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
    <div className="min-h-screen bg-[#F9F9F9] relative overflow-hidden">
      {/* Background Coffee Image */}
      <div className="absolute inset-x-0 top-0 h-[66%] overflow-hidden">
        <Image
          src="/images/promo-coffee.jpg"
          alt="Coffee"
          fill
          className="object-cover scale-125"
          priority
        />
      </div>

      {/* Bottom Gradient + Content */}
      <div className="absolute inset-x-0 bottom-0 h-[44%]">
        {/* Gradient overlay fading from transparent to dark */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5, 5, 5, 0) 0%, #050505 24%)",
          }}
        />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center gap-2 px-6 pt-6">
          <h1
            className="text-[32px] font-semibold text-white text-center leading-[48px] tracking-[0.16px]"
          >
            Fall in Love with Coffee in Blissful Delight!
          </h1>
          <p
            className="text-[14px] font-normal text-[#A2A2A2] text-center leading-[21px] tracking-[0.14px]"
          >
            Welcome to our cozy coffee corner, where every cup is a delightful for you.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="absolute bottom-[68px] left-6 right-6 z-10">
          <button
            onClick={handleGetStarted}
            className="w-full bg-[#C67C4E] text-white font-semibold text-[16px] leading-[24px] py-4 px-5 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-[21px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#242424] rounded-full" />
    </div>
  );
}
