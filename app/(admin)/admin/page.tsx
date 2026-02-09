import Link from "next/link";
import { mockAdminStats } from "@/lib/mock-data";

export default function AdminDashboard() {
  const stats = mockAdminStats;

  const cards = [
    { label: "Total Orders", value: stats.totalOrders.toString(), color: "bg-[#C67C4E]" },
    { label: "Active", value: stats.activeOrders.toString(), color: "bg-yellow-500" },
    { label: "Products", value: stats.totalProducts.toString(), color: "bg-blue-500" },
    { label: "Revenue", value: `$${stats.totalRevenue.toFixed(0)}`, color: "bg-green-500" },
  ];

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4">
        <h1 className="text-[22px] font-bold text-[#2F2D2C]">Admin Dashboard</h1>
        <p className="text-[14px] text-[#9B9B9B] mt-1">Welcome back, Admin</p>
      </div>

      <div className="px-7">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-4">
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <span className="text-white text-[14px] font-bold">#</span>
              </div>
              <p className="text-[24px] font-bold text-[#2F2D2C]">{card.value}</p>
              <p className="text-[12px] text-[#9B9B9B] mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h3 className="text-[16px] font-semibold text-[#2F2D2C] mb-3">Quick Actions</h3>
        <div className="space-y-3 pb-4">
          <Link href="/admin/orders" className="flex items-center gap-4 bg-white rounded-2xl p-4">
            <div className="w-12 h-12 bg-[#FFF5EE] rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C67C4E" strokeWidth="2" strokeLinecap="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[#2F2D2C]">Manage Orders</p>
              <p className="text-[12px] text-[#9B9B9B]">Accept, reject, assign agents</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          <Link href="/admin/inventory" className="flex items-center gap-4 bg-white rounded-2xl p-4">
            <div className="w-12 h-12 bg-[#FFF5EE] rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C67C4E" strokeWidth="2" strokeLinecap="round">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[#2F2D2C]">Inventory</p>
              <p className="text-[12px] text-[#9B9B9B]">Manage products and availability</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          <Link href="/admin/agents" className="flex items-center gap-4 bg-white rounded-2xl p-4">
            <div className="w-12 h-12 bg-[#FFF5EE] rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C67C4E" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[#2F2D2C]">Delivery Agents</p>
              <p className="text-[12px] text-[#9B9B9B]">Manage delivery team</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
