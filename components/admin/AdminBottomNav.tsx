"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/orders", label: "Orders", icon: OrdersIcon },
  { href: "/admin/inventory", label: "Inventory", icon: InventoryIcon },
  { href: "/admin/agents", label: "Agents", icon: AgentsIcon },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="flex items-center justify-around h-[70px] px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-2 px-3"
            >
              <item.icon active={isActive} />
              <span className={`text-[10px] font-medium ${isActive ? "text-[#C67C4E]" : "text-[#9B9B9B]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center pb-2">
        <div className="w-[134px] h-[5px] bg-[#2F2D2C] rounded-full" />
      </div>
    </nav>
  );
}

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" fill={active ? "#C67C4E" : "#9B9B9B"} />
      <rect x="13" y="3" width="8" height="4" rx="2" fill={active ? "#C67C4E" : "#9B9B9B"} />
      <rect x="13" y="9" width="8" height="12" rx="2" fill={active ? "#C67C4E" : "#9B9B9B"} />
      <rect x="3" y="13" width="8" height="8" rx="2" fill={active ? "#C67C4E" : "#9B9B9B"} />
    </svg>
  );
}

function OrdersIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#C67C4E" : "#9B9B9B"} strokeWidth="2" strokeLinecap="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function InventoryIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#C67C4E" : "#9B9B9B"} strokeWidth="2" strokeLinecap="round">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function AgentsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#C67C4E" : "#9B9B9B"} strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
