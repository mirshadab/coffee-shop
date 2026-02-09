import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { mockNotifications } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="flex items-center justify-between px-7 pt-16 pb-4">
        <Link href="/profile" className="w-10 h-10 flex items-center justify-center -ml-2">
          <ChevronLeftIcon />
        </Link>
        <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Notifications</h1>
        <div className="w-10" />
      </div>

      <div className="bg-white rounded-t-3xl px-7 pt-6 pb-8 min-h-[70vh]">
        <div className="space-y-1">
          {mockNotifications.map((notif, index) => (
            <div
              key={notif.id}
              className={`py-4 ${index < mockNotifications.length - 1 ? "border-b border-[#F4F4F4]" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#F9F2ED] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${notif.read ? "bg-[#DEDEDE]" : "bg-[#C67C4E]"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#2F2D2C]">{notif.title}</p>
                  <p className="text-[12px] text-[#9B9B9B] mt-0.5">{notif.message}</p>
                  <p className="text-[11px] text-[#BEBEBE] mt-1">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
