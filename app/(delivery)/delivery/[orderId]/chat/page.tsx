import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import ChatUI from "@/components/ChatUI";

export default async function ChatPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const agentName = "James Wilson";

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex items-center gap-3 px-7 pt-16 pb-4 border-b border-[#EAEAEA]">
        <Link href={`/delivery/${orderId}`} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ChevronLeftIcon />
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-[#C67C4E] to-[#EDD6C8] rounded-full flex items-center justify-center">
            <span className="text-white text-[14px] font-bold">
              {agentName.split(" ").map((n: string) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#2F2D2C]">{agentName}</p>
            <p className="text-[11px] text-[#9B9B9B]">Delivery Agent</p>
          </div>
        </div>
      </div>

      <ChatUI orderId={orderId} currentUserId="demo-user" />
    </div>
  );
}
