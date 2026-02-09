import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { getUserOrders } from "@/lib/actions/order";

const statusMessages: Record<string, string> = {
  PENDING: "Your order is being reviewed",
  ACCEPTED: "Your order has been accepted",
  PREPARING: "Your coffee is being prepared",
  OUT_FOR_DELIVERY: "Your order is on the way!",
  DELIVERED: "Your order has been delivered",
  CANCELLED: "Your order was cancelled",
};

export default async function NotificationsPage() {
  const orders = await getUserOrders();

  const notifications = orders.map((order) => ({
    id: order.id,
    title: statusMessages[order.status] || "Order update",
    description: `Order #${order.id.slice(-6)} · ${order.items.map((i) => i.product.name).join(", ")}`,
    time: order.updatedAt,
    status: order.status,
  }));

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
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center pt-16">
            <div className="w-20 h-20 bg-[#F9F2ED] rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#2F2D2C]">No notifications</h2>
            <p className="text-[14px] text-[#9B9B9B] mt-2">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notif, index) => (
              <div
                key={notif.id}
                className={`py-4 ${index < notifications.length - 1 ? "border-b border-[#F4F4F4]" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#F9F2ED] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 bg-[#C67C4E] rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#2F2D2C]">{notif.title}</p>
                    <p className="text-[12px] text-[#9B9B9B] mt-0.5">{notif.description}</p>
                    <p className="text-[11px] text-[#BEBEBE] mt-1">
                      {new Date(notif.time).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
