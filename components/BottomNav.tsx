"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, HeartIcon, BagIcon, BellIcon } from "./icons";
import { useCart } from "@/lib/context/CartContext";

const navItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/menu", icon: HeartIcon, label: "Favorites" },
  { href: "/cart", icon: BagIcon, label: "Cart" },
  { href: "/profile", icon: BellIcon, label: "Notifications" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white z-50 rounded-t-2xl shadow-[0_-2px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around h-[65px] px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-12 h-12 relative"
            >
              <item.icon active={isActive} />
              {item.href === "/cart" && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C67C4E] text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
              {isActive && (
                <div className="mt-1 w-[10px] h-[5px] bg-[#C67C4E] rounded-full" />
              )}
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
