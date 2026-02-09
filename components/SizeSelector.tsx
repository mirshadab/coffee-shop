"use client";

import { useState } from "react";

const sizes = ["S", "M", "L"];

export default function SizeSelector({ onSizeChange }: { onSizeChange?: (size: string) => void }) {
  const [selected, setSelected] = useState("M");

  const handleSelect = (size: string) => {
    setSelected(size);
    onSizeChange?.(size);
  };

  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSelect(size)}
          className={`flex-1 h-[44px] rounded-xl border text-[14px] font-medium transition-all ${
            selected === size
              ? "border-[#C67C4E] bg-[#FFF5EE] text-[#C67C4E]"
              : "border-[#DEDEDE] bg-white text-[#2F2D2C]"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
