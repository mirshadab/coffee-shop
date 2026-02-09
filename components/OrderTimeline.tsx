"use client";

const steps = [
  { key: "PENDING", label: "Order Placed" },
  { key: "ACCEPTED", label: "Order Accepted" },
  { key: "PREPARING", label: "Preparing" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

export default function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = steps.findIndex((s) => s.key === currentStatus);

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.key} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? "bg-[#C67C4E]"
                    : "border-2 border-[#DEDEDE] bg-white"
                }`}
              >
                {isCompleted && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-8 ${isCompleted ? "bg-[#C67C4E]" : "bg-[#DEDEDE]"}`} />
              )}
            </div>
            <div className="pt-0.5 pb-2">
              <p className={`text-[14px] font-${isCurrent ? "bold" : "medium"} ${isCompleted ? "text-[#2F2D2C]" : "text-[#9B9B9B]"}`}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
