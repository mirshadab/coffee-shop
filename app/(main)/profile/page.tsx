import Link from "next/link";
import { ChevronRightIcon, SettingsIcon } from "@/components/icons";
import SignOutButton from "@/components/SignOutButton";
import { mockUser, mockOrders } from "@/lib/mock-data";

const menuItems = [
  { label: "My Orders", description: "View your order history", href: "/orders" },
  { label: "Delivery Address", description: "Manage delivery addresses", href: "/settings" },
  { label: "Payment Methods", description: "Manage payment options", href: "/settings" },
  { label: "Notifications", description: "Notification preferences", href: "/notifications" },
  { label: "Favourite", description: "Your favourite coffees", href: "/menu" },
  { label: "Help Center", description: "Get help and support", href: "/settings" },
];

export default function ProfilePage() {
  const user = mockUser;
  const orders = mockOrders;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4 flex items-center justify-between">
        <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Profile</h1>
        <Link href="/settings" className="w-10 h-10 flex items-center justify-center -mr-2">
          <SettingsIcon />
        </Link>
      </div>

      <div className="bg-white rounded-t-3xl px-7 pt-6 pb-0">
        {/* Profile Card */}
        <div className="flex items-center gap-4 pb-6">
          <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#C67C4E] to-[#EDD6C8] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[20px] font-bold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[16px] font-bold text-[#2F2D2C]">{user.name}</h2>
            <p className="text-[12px] text-[#9B9B9B] mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 pb-6">
          <div className="flex-1 bg-[#F9F2ED] rounded-2xl py-4 text-center">
            <p className="text-[22px] font-bold text-[#C67C4E]">{orders.length}</p>
            <p className="text-[12px] text-[#9B9B9B] mt-0.5">Orders</p>
          </div>
          <div className="flex-1 bg-[#F9F2ED] rounded-2xl py-4 text-center">
            <p className="text-[22px] font-bold text-[#C67C4E]">{orders.filter((o) => o.status === "DELIVERED").length}</p>
            <p className="text-[12px] text-[#9B9B9B] mt-0.5">Delivered</p>
          </div>
          <div className="flex-1 bg-[#F9F2ED] rounded-2xl py-4 text-center">
            <p className="text-[22px] font-bold text-[#C67C4E]">${totalSpent.toFixed(0)}</p>
            <p className="text-[12px] text-[#9B9B9B] mt-0.5">Total Spent</p>
          </div>
        </div>

        <div className="h-px bg-[#EAEAEA] -mx-7" />

        {/* Menu Items */}
        <div className="py-1">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center justify-between py-4 ${
                index < menuItems.length - 1 ? "border-b border-[#F4F4F4]" : ""
              }`}
            >
              <div className="text-left">
                <p className="text-[14px] font-semibold text-[#2F2D2C]">{item.label}</p>
                <p className="text-[12px] text-[#9B9B9B] mt-0.5">{item.description}</p>
              </div>
              <ChevronRightIcon />
            </Link>
          ))}
        </div>

        {/* Sign Out */}
        <div className="pt-2 pb-8">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
