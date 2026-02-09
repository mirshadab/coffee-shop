"use client";

import { useState } from "react";

const categories = ["All Coffee", "Machiato", "Latte", "Americano", "Espresso", "Cappuccino"];

interface CategoryTabsProps {
  onSelect?: (category: string) => void;
}

export default function CategoryTabs({ onSelect }: CategoryTabsProps) {
  const [active, setActive] = useState("All Coffee");

  const handleSelect = (cat: string) => {
    setActive(cat);
    onSelect?.(cat);
  };

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
            active === cat
              ? "bg-[#C67C4E] text-white"
              : "bg-transparent text-[#313131]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
