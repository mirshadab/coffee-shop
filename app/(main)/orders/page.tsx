import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { mockOrders } from "@/lib/mock-data";

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

export default function OrdersPage() {
  const orders = mockOrders;

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
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
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
                {order.items.slice(0, 1).map((item) => (
                  <div key={item.id} className="relative w-[48px] h-[48px] rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                  </div>
                ))}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#2F2D2C]">
                    {order.items.map((i) => i.product.name).join(", ")}
                  </p>
                  <p className="text-[12px] text-[#9B9B9B] mt-0.5">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)} items · ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
