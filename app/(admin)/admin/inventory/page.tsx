"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/lib/context/ToastContext";
import { mockProducts } from "@/lib/mock-data";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState(mockProducts.map((p) => ({ ...p })));
  const { showToast } = useToast();

  const handleToggle = (id: string) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, available: !p.available } : p));
    showToast("Product status updated");
  };

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Inventory</h1>
          <p className="text-[12px] text-[#9B9B9B] mt-1">{products.length} products</p>
        </div>
      </div>

      <div className="px-7 pb-4">
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="relative w-[50px] h-[50px] rounded-xl overflow-hidden flex-shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#2F2D2C]">{product.name}</p>
                <p className="text-[12px] text-[#9B9B9B]">${product.price.toFixed(2)} · {product.category}</p>
              </div>
              <button
                onClick={() => handleToggle(product.id)}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${
                  product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {product.available ? "Active" : "Disabled"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
