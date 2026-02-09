import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { getUserOrders } from "@/lib/actions/order";

type Order = Awaited<ReturnType<typeof getUserOrders>>[0];
type OrderItem = Order["items"][0];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-purple-100 text-purple-700",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "On the way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="flex items-center justify-between px-7 pt-16 pb-4">
        <Link href="/profile" className="w-10 h-10 flex items-center justify-center -ml-2">
          <ChevronLeftIcon />
        </Link>
        <h1 className="text-[18px] font-semibold text-[#2F2D2C]">My Orders</h1>
        <div className="w-10" />
      </div>

      <div className="bg-white rounded-t-3xl px-7 pt-6 pb-8 min-h-[70vh]">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center pt-16">
            <div className="w-20 h-20 bg-[#F9F2ED] rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#2F2D2C]">No orders yet</h2>
            <p className="text-[14px] text-[#9B9B9B] mt-2">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: Order) => (
              <Link
                key={order.id}
                href={order.status !== "DELIVERED" && order.status !== "CANCELLED" ? `/delivery/${order.id}` : "#"}
                className="block border border-[#EAEAEA] rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] text-[#9B9B9B]">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {order.items.slice(0, 1).map((item: OrderItem) => (
                    <div key={item.id} className="relative w-[48px] h-[48px] rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                    </div>
                  ))}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#2F2D2C]">
                      {order.items.map((i: OrderItem) => i.product.name).join(", ")}
                    </p>
                    <p className="text-[12px] text-[#9B9B9B] mt-0.5">
                      {order.items.reduce((sum: number, i: OrderItem) => sum + i.quantity, 0)} items · ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
