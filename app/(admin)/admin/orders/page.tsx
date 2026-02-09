"use client";

import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/lib/context/ToastContext";
import { mockAgents, mockProducts } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-purple-100 text-purple-700",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const initialOrders = [
  {
    id: "order-a1",
    status: "PENDING",
    totalAmount: 9.06,
    createdAt: new Date().toISOString(),
    user: { name: "Jooklyn Simmons" },
    items: [{ id: "i1", quantity: 2, price: 4.53, product: mockProducts[0] }],
    orderDelivery: null as { agent: { name: string } } | null,
  },
  {
    id: "order-a2",
    status: "PREPARING",
    totalAmount: 7.33,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    user: { name: "Sarah Chen" },
    items: [
      { id: "i2", quantity: 1, price: 3.53, product: mockProducts[1] },
      { id: "i3", quantity: 1, price: 3.80, product: mockProducts[6] },
    ],
    orderDelivery: null as { agent: { name: string } } | null,
  },
  {
    id: "order-a3",
    status: "DELIVERED",
    totalAmount: 4.20,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    user: { name: "Mike Johnson" },
    items: [{ id: "i4", quantity: 1, price: 4.20, product: mockProducts[5] }],
    orderDelivery: { agent: { name: "James Wilson" } },
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const { showToast } = useToast();

  const handleStatusUpdate = (orderId: string, status: string) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${status.toLowerCase()}`);
  };

  const handleAssignAgent = (orderId: string, agentName: string) => {
    setOrders((prev) => prev.map((o) =>
      o.id === orderId ? { ...o, status: "OUT_FOR_DELIVERY", orderDelivery: { agent: { name: agentName } } } : o
    ));
    showToast("Agent assigned");
  };

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4">
        <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Orders</h1>
        <p className="text-[12px] text-[#9B9B9B] mt-1">{orders.length} total orders</p>
      </div>

      <div className="px-7 pb-4 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[13px] font-semibold text-[#2F2D2C]">{order.user.name}</p>
                <p className="text-[11px] text-[#9B9B9B]">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                {order.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="32px" />
                  </div>
                  <span className="text-[12px] text-[#2F2D2C] flex-1">{item.quantity}x {item.product.name}</span>
                  <span className="text-[12px] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[13px] font-semibold text-[#2F2D2C] mb-3 pt-2 border-t border-[#F4F4F4]">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>

            {order.status === "PENDING" && (
              <div className="flex gap-2">
                <button onClick={() => handleStatusUpdate(order.id, "ACCEPTED")} className="flex-1 bg-[#C67C4E] text-white text-[12px] font-semibold h-[36px] rounded-xl">Accept</button>
                <button onClick={() => handleStatusUpdate(order.id, "CANCELLED")} className="flex-1 border border-red-300 text-red-500 text-[12px] font-semibold h-[36px] rounded-xl">Reject</button>
              </div>
            )}

            {order.status === "ACCEPTED" && (
              <button onClick={() => handleStatusUpdate(order.id, "PREPARING")} className="w-full bg-purple-500 text-white text-[12px] font-semibold h-[36px] rounded-xl">Start Preparing</button>
            )}

            {order.status === "PREPARING" && (
              <div>
                <p className="text-[12px] font-medium text-[#2F2D2C] mb-2">Assign Delivery Agent:</p>
                <div className="space-y-2">
                  {mockAgents.filter((a) => a.available).map((agent) => (
                    <button key={agent.id} onClick={() => handleAssignAgent(order.id, agent.name)} className="w-full flex items-center gap-3 border border-[#EAEAEA] rounded-xl p-3 text-left hover:border-[#C67C4E] transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#C67C4E] to-[#EDD6C8] rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{agent.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#2F2D2C]">{agent.name}</p>
                        <p className="text-[10px] text-[#9B9B9B]">{agent.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {order.status === "OUT_FOR_DELIVERY" && order.orderDelivery && (
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#9B9B9B]">Agent: {order.orderDelivery.agent.name}</span>
                <button onClick={() => handleStatusUpdate(order.id, "DELIVERED")} className="ml-auto bg-green-500 text-white text-[12px] font-semibold px-4 h-[36px] rounded-xl">Mark Delivered</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
