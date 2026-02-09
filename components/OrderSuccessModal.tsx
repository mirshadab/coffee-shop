"use client";

import { useRouter } from "next/navigation";

interface OrderSuccessModalProps {
  orderId: string;
  onClose: () => void;
}

export default function OrderSuccessModal({ orderId, onClose }: OrderSuccessModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl mx-7 p-7 text-center max-w-[380px] w-full">
        {/* Success icon */}
        <div className="w-20 h-20 bg-[#C67C4E] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-[22px] font-bold text-[#2F2D2C]">Order Success!</h2>
        <p className="text-[14px] text-[#9B9B9B] mt-2">
          Your order has been placed successfully. You can track your delivery in real-time.
        </p>

        <button
          onClick={() => router.push(`/delivery/${orderId}`)}
          className="w-full bg-[#C67C4E] text-white font-semibold text-[16px] h-[56px] rounded-2xl mt-6 active:scale-[0.98] transition-transform"
        >
          Track My Order
        </button>

        <button
          onClick={onClose}
          className="w-full border border-[#DEDEDE] text-[#2F2D2C] font-semibold text-[14px] h-[48px] rounded-2xl mt-3"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
