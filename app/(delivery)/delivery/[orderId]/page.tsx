import Link from "next/link";

export default function DeliveryPage() {
  const agent = { name: "James Wilson", phone: "+1555123456" };
  const eta = 10;
  const status = "OUT_FOR_DELIVERY";
  const filledBars = 3;
  const address = "Jl. Kpg Sutoyo";

  const statusText: Record<string, string> = {
    PENDING: "Order placed",
    ACCEPTED: "Order confirmed",
    PREPARING: "Preparing your order",
    OUT_FOR_DELIVERY: "Delivered your order",
    DELIVERED: "Order delivered",
  };

  const statusDesc: Record<string, string> = {
    PENDING: "Your order is being reviewed by the shop.",
    ACCEPTED: "Your order has been accepted and will be prepared shortly.",
    PREPARING: "Your coffee is being carefully prepared.",
    OUT_FOR_DELIVERY: "We will deliver your goods to you in\nthe shortest possible time.",
    DELIVERED: "Your order has been delivered successfully!",
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen relative flex flex-col">
      {/* Map Area */}
      <div className="flex-1 relative min-h-[420px]">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8E4DF] to-[#D5D0CA] overflow-hidden">
          {/* Map grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9B9B9B" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 375 420" fill="none">
            <path d="M 90 210 L 90 180 L 250 180 L 250 310" stroke="#C67C4E" strokeWidth="3" strokeDasharray="0" fill="none" />
          </svg>

          {/* Location pin */}
          <div className="absolute left-[18%] top-[46%]">
            <div className="w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center shadow-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C67C4E" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>

          {/* Motorbike icon */}
          <div className="absolute left-[58%] top-[68%]">
            <div className="bg-white rounded-[20px] p-2 shadow-[0_4px_4px_rgba(184,184,184,0.25)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#C67C4E">
                  <path d="M19 7h-1l-2-4h-3v2h2l1.5 3H12l-.5-2H9v2H7.5A4.5 4.5 0 003 12.5 4.5 4.5 0 007.5 17a4.5 4.5 0 004.24-3h.52a4.5 4.5 0 004.24 3 4.5 4.5 0 004.5-4.5A4.5 4.5 0 0016.5 8H15l-.5-1H19V7zM7.5 15A2.5 2.5 0 015 12.5 2.5 2.5 0 017.5 10a2.5 2.5 0 012.5 2.5A2.5 2.5 0 017.5 15zm9 0a2.5 2.5 0 01-2.5-2.5A2.5 2.5 0 0116.5 10a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Top Nav Overlay */}
        <div className="absolute top-[68px] left-0 right-0 flex items-center justify-between px-6">
          <Link
            href="/orders"
            className="w-[44px] h-[44px] bg-[#EDEDED] rounded-[12px] flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F2D2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <button className="w-[44px] h-[44px] bg-[#EDEDED] rounded-[12px] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F2D2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-[24px] px-6 pb-10 relative z-10 -mt-6">
        {/* Drag Indicator */}
        <div className="flex justify-center pt-4 pb-5">
          <div className="w-[45px] h-[5px] bg-[#E3E3E3] rounded-[16px]" />
        </div>

        {/* ETA */}
        <div className="text-center mb-4">
          <p className="text-[16px] font-semibold text-[#242424] leading-[1.5]">{eta} minutes left</p>
          <p className="text-[12px] leading-[1.5]">
            <span className="text-[#A2A2A2]">Delivery to </span>
            <span className="font-semibold text-[#2A2A2A]">{address}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-[10px] h-[4px] mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 rounded-[20px] ${i < filledBars ? "bg-[#36C07E]" : "bg-[#E3E3E3]"}`}
            />
          ))}
        </div>

        {/* Status Card */}
        <div className="flex items-center gap-4 border border-[#E3E3E3] rounded-[12px] pl-3 pr-4 py-2 mb-6">
          <div className="w-[56px] h-[56px] border border-[#E3E3E3] rounded-[12px] flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#C67C4E">
              <path d="M19 7h-1l-2-4h-3v2h2l1.5 3H12l-.5-2H9v2H7.5A4.5 4.5 0 003 12.5 4.5 4.5 0 007.5 17a4.5 4.5 0 004.24-3h.52a4.5 4.5 0 004.24 3 4.5 4.5 0 004.5-4.5A4.5 4.5 0 0016.5 8H15l-.5-1H19V7zM7.5 15A2.5 2.5 0 015 12.5 2.5 2.5 0 017.5 10a2.5 2.5 0 012.5 2.5A2.5 2.5 0 017.5 15zm9 0a2.5 2.5 0 01-2.5-2.5A2.5 2.5 0 0116.5 10a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5z" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-[#242424] leading-[1.5]">
              {statusText[status] || "Processing"}
            </p>
            <p className="text-[12px] font-light text-[#A2A2A2] leading-[1.5] whitespace-pre-line">
              {statusDesc[status] || "Your order is being processed."}
            </p>
          </div>
        </div>

        {/* Driver */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[56px] h-[56px] bg-gradient-to-br from-[#C67C4E] to-[#EDD6C8] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {agent ? (
                <span className="text-white text-[18px] font-bold">
                  {agent.name.split(" ").map((n: string) => n[0]).join("")}
                </span>
              ) : (
                <span className="text-white text-[18px] font-bold">?</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-semibold text-[#242424] leading-[1.5]">
                {agent?.name || "Awaiting assignment"}
              </p>
              <p className="text-[12px] font-normal text-[#A2A2A2] leading-[1.2]">
                Personal Courier
              </p>
            </div>
          </div>
          {agent && (
            <a
              href={`tel:${agent.phone}`}
              className="w-[44px] h-[44px] border border-[#E3E3E3] rounded-[12px] flex items-center justify-center flex-shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F2D2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
