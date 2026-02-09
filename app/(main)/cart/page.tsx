"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, EditIcon, NoteIcon, ChevronDownIcon } from "@/components/icons";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";
import { placeOrderAction } from "@/lib/actions/order";
import OrderSuccessModal from "@/components/OrderSuccessModal";

export default function CartPage() {
  const { items, updateQuantity, clearCart, totalPrice } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<"DELIVER" | "PICKUP">("DELIVER");
  const [placing, setPlacing] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const deliveryFee = deliveryMethod === "DELIVER" ? 1.0 : 0;
  const total = totalPrice + deliveryFee;

  const handleOrder = async () => {
    if (items.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setPlacing(true);
    try {
      const result = await placeOrderAction({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        })),
        deliveryMethod,
        address: "Jl. Kpg Sutoyo No. 620, Bilzen, Tanjungbalai",
      });

      if (result.error) {
        showToast(result.error, "error");
      } else if (result.orderId) {
        clearCart();
        setSuccessOrderId(result.orderId);
      }
    } catch {
      showToast("Failed to place order", "error");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0 && !successOrderId) {
    return (
      <div className="bg-[#F9F2ED] min-h-screen">
        <div className="px-7 pt-16 pb-4">
          <h1 className="text-[18px] font-semibold text-[#2F2D2C] text-center">Order</h1>
        </div>
        <div className="bg-white rounded-t-3xl px-7 pt-16 pb-8 flex flex-col items-center min-h-[60vh]">
          <div className="w-20 h-20 bg-[#F9F2ED] rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9B9B9B" strokeWidth="2" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h2 className="text-[18px] font-bold text-[#2F2D2C]">Your cart is empty</h2>
          <p className="text-[14px] text-[#9B9B9B] mt-2 text-center">Add some coffee to get started!</p>
          <button
            onClick={() => router.push("/menu")}
            className="mt-6 bg-[#C67C4E] text-white font-semibold text-[14px] px-8 h-[48px] rounded-2xl"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4">
        <h1 className="text-[18px] font-semibold text-[#2F2D2C] text-center">Order</h1>
      </div>

      {/* Delivery Toggle */}
      <div className="px-7 mb-6">
        <div className="flex bg-[#EDEDED] rounded-xl p-[3px]">
          <button
            onClick={() => setDeliveryMethod("DELIVER")}
            className={`flex-1 py-[10px] rounded-[10px] text-[14px] font-semibold transition-all ${
              deliveryMethod === "DELIVER"
                ? "bg-[#C67C4E] text-white shadow-sm"
                : "text-[#2F2D2C]"
            }`}
          >
            Deliver
          </button>
          <button
            onClick={() => setDeliveryMethod("PICKUP")}
            className={`flex-1 py-[10px] rounded-[10px] text-[14px] font-semibold transition-all ${
              deliveryMethod === "PICKUP"
                ? "bg-[#C67C4E] text-white shadow-sm"
                : "text-[#2F2D2C]"
            }`}
          >
            Pick Up
          </button>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl px-7 pt-6 pb-0">
        {/* Delivery Address */}
        {deliveryMethod === "DELIVER" && (
          <div className="mb-5">
            <h3 className="text-[14px] font-semibold text-[#2F2D2C] mb-3">Delivery Address</h3>
            <p className="text-[14px] font-bold text-[#2F2D2C]">Jl. Kpg Sutoyo</p>
            <p className="text-[12px] text-[#9B9B9B] mt-1">Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai</p>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-1.5 border border-[#DEDEDE] rounded-full px-3 py-1.5 text-[12px] font-medium text-[#2F2D2C]">
                <EditIcon />
                Edit Address
              </button>
              <button className="flex items-center gap-1.5 border border-[#DEDEDE] rounded-full px-3 py-1.5 text-[12px] font-medium text-[#2F2D2C]">
                <NoteIcon />
                Add Note
              </button>
            </div>
          </div>
        )}

        <div className="h-px bg-[#EAEAEA] -mx-7 px-7" />

        {/* Cart Items */}
        <div className="py-3">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3 py-2">
              <div className="relative w-[54px] h-[54px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="54px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[16px] font-semibold text-[#2F2D2C]">{item.name}</h4>
                <p className="text-[12px] text-[#9B9B9B]">{item.subtitle} · Size {item.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                  className="w-[28px] h-[28px] border border-[#DEDEDE] rounded-full flex items-center justify-center"
                >
                  <MinusIcon />
                </button>
                <span className="text-[14px] font-semibold w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                  className="w-[28px] h-[28px] border border-[#DEDEDE] rounded-full flex items-center justify-center"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#EAEAEA]" />

        {/* Discount */}
        <div className="py-4">
          <div className="flex items-center gap-3 border border-[#EAEAEA] rounded-2xl px-4 py-3">
            <div className="w-6 h-6 bg-[#C67C4E] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">%</span>
            </div>
            <span className="text-[14px] font-semibold text-[#2F2D2C] flex-1">1 Discount is Applied</span>
            <ChevronDownIcon />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="pt-2 pb-4">
          <h3 className="text-[16px] font-semibold text-[#2F2D2C] mb-4">Payment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[14px] text-[#2F2D2C]">Price</span>
              <span className="text-[14px] font-semibold text-[#2F2D2C]">$ {totalPrice.toFixed(2)}</span>
            </div>
            {deliveryMethod === "DELIVER" && (
              <div className="flex justify-between">
                <span className="text-[14px] text-[#2F2D2C]">Delivery Fee</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#9B9B9B] line-through">$ 2.0</span>
                  <span className="text-[14px] font-semibold text-[#2F2D2C]">$ {deliveryFee.toFixed(1)}</span>
                </div>
              </div>
            )}
          </div>
          <div className="h-px bg-[#EAEAEA] my-4" />
          <div className="flex justify-between">
            <span className="text-[14px] font-semibold text-[#2F2D2C]">Total Payment</span>
            <span className="text-[14px] font-semibold text-[#2F2D2C]">$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method & Order Button */}
        <div className="pt-3 pb-8 border-t border-[#EAEAEA]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[#C67C4E] rounded-md flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">$</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="bg-[#C67C4E] text-white text-[12px] font-semibold px-3 py-1 rounded-full">Cash</span>
              <span className="text-[14px] font-medium text-[#2F2D2C]">$ {total.toFixed(2)}</span>
            </div>
            <ChevronDownIcon />
          </div>
          <button
            onClick={handleOrder}
            disabled={placing}
            className="w-full bg-[#C67C4E] text-white font-semibold text-[16px] h-[56px] rounded-2xl active:scale-[0.98] transition-transform disabled:opacity-60"
          >
            {placing ? "Placing Order..." : "Order"}
          </button>
        </div>
      </div>

      {successOrderId && (
        <OrderSuccessModal
          orderId={successOrderId}
          onClose={() => {
            setSuccessOrderId(null);
            router.push("/");
          }}
        />
      )}
    </div>
  );
}
