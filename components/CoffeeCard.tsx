"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon, PlusIcon } from "./icons";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";

interface CoffeeCardProps {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  rating: string;
  image: string;
}

export default function CoffeeCard({ id, name, subtitle, price, rating, image }: CoffeeCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: id,
      name,
      subtitle,
      image,
      price: parseFloat(price),
      size: "M",
    });
    showToast(`${name} added to cart`);
  };

  return (
    <Link href={`/product?id=${id}`} className="block">
      <div className="bg-white rounded-2xl p-2 pb-3">
        <div className="relative w-full aspect-[4/4] rounded-2xl overflow-hidden mb-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 45vw, 180px"
          />
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#2F2D2C]/60 backdrop-blur-sm rounded-lg px-1.5 py-0.5">
            <StarIcon />
            <span className="text-white text-[10px] font-bold">{rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-[16px] text-[#2F2D2C] leading-tight">{name}</h3>
        <p className="text-[12px] text-[#9B9B9B] mt-0.5">{subtitle}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[18px] font-bold text-[#2F2D2C]">$ {price}</span>
          <button
            onClick={handleAdd}
            className="w-8 h-8 bg-[#C67C4E] rounded-[10px] flex items-center justify-center active:scale-95 transition-transform"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </Link>
  );
}
