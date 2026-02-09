export const dynamic = "force-dynamic";

import SearchBar from "@/components/SearchBar";
import PromoCard from "@/components/PromoCard";
import CategoryTabs from "@/components/CategoryTabs";
import CoffeeCard from "@/components/CoffeeCard";
import { ChevronDownIcon } from "@/components/icons";
import { getProducts } from "@/lib/actions/product";

type Product = Awaited<ReturnType<typeof getProducts>>[0];

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-[#F9F2ED]">
      {/* Dark Header Section */}
      <div className="bg-gradient-to-b from-[#131313] to-[#313131] px-7 pt-16 pb-[100px]">
        {/* Location */}
        <div className="mb-7">
          <p className="text-[12px] text-[#A2A2A2] font-normal tracking-wide">Location</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[14px] font-semibold text-white">Bilzen, Tanjungbalai</span>
            <ChevronDownIcon />
          </div>
        </div>

        {/* Search */}
        <SearchBar />
      </div>

      {/* Promo Banner - overlapping the dark header */}
      <div className="px-7 -mt-[60px]">
        <PromoCard />
      </div>

      {/* Categories */}
      <div className="px-7 mt-6">
        <CategoryTabs />
      </div>

      {/* Coffee Grid */}
      <div className="px-7 mt-4 grid grid-cols-2 gap-4 pb-4">
        {products.slice(0, 4).map((product: Product) => (
          <CoffeeCard
            key={product.id}
            id={product.id}
            name={product.name}
            subtitle={product.subtitle}
            price={product.price.toFixed(2)}
            rating={product.rating.toFixed(1)}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
