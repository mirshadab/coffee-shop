"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import SizeSelector from "@/components/SizeSelector";
import { ChevronLeftIcon, HeartIcon, StarIcon, CoffeeDeliveryIcon, CoffeeBeanIcon, MilkIcon } from "@/components/icons";
import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/lib/context/ToastContext";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

function ProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const id = searchParams.get("id") || "";
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then(setProduct);
    }
  }, [id]);

  if (!product) {
    return <div className="min-h-screen bg-[#F9F2ED]" />;
  }

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.image,
      price: product.price,
      size: selectedSize,
    });
    showToast(`${product.name} added to cart`);
    router.push("/cart");
  };

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="flex items-center justify-between px-7 pt-16 pb-3">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Detail</h1>
        <button className="w-10 h-10 flex items-center justify-center -mr-2">
          <HeartIcon />
        </button>
      </div>

      <div className="px-7">
        <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 380px"
            priority
          />
        </div>
      </div>

      <div className="bg-white rounded-t-3xl mt-5 px-7 pt-5 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-[#2F2D2C]">{product.name}</h2>
            <p className="text-[12px] text-[#9B9B9B] mt-0.5">Ice/Hot</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#F9F2ED] rounded-xl flex items-center justify-center">
              <CoffeeDeliveryIcon />
            </div>
            <div className="w-11 h-11 bg-[#F9F2ED] rounded-xl flex items-center justify-center">
              <CoffeeBeanIcon />
            </div>
            <div className="w-11 h-11 bg-[#F9F2ED] rounded-xl flex items-center justify-center">
              <MilkIcon />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          <StarIcon />
          <span className="text-[16px] font-bold text-[#2F2D2C]">{product.rating.toFixed(1)}</span>
          <span className="text-[12px] text-[#9B9B9B]">({product.reviews})</span>
        </div>

        <div className="h-px bg-[#EAEAEA] my-5" />

        <div>
          <h3 className="text-[16px] font-semibold text-[#2F2D2C]">Description</h3>
          <p className="text-[14px] text-[#9B9B9B] mt-3 leading-[22px]">
            {product.description}{" "}
            <button className="text-[#C67C4E] font-semibold">Read More</button>
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-[16px] font-semibold text-[#2F2D2C] mb-3">Size</h3>
          <SizeSelector onSizeChange={setSelectedSize} />
        </div>

        <div className="flex items-center justify-between pt-5 pb-8 mt-4 border-t border-[#EAEAEA]">
          <div>
            <p className="text-[12px] text-[#9B9B9B]">Price</p>
            <p className="text-[22px] font-bold text-[#C67C4E]">$ {product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleBuyNow}
            className="bg-[#C67C4E] text-white font-semibold text-[16px] py-4 px-[60px] rounded-2xl active:scale-[0.98] transition-transform"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F2ED]" />}>
      <ProductContent />
    </Suspense>
  );
}
