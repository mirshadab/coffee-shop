import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import CoffeeCard from "@/components/CoffeeCard";
import { getProducts } from "@/lib/actions/product";

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <div className="bg-[#F9F2ED]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#131313] to-[#313131] px-7 pt-16 pb-8">
        <h1 className="text-[18px] font-semibold text-white mb-5">Menu</h1>
        <SearchBar />
      </div>

      {/* Categories */}
      <div className="px-7 mt-6">
        <CategoryTabs />
      </div>

      {/* Coffee Grid */}
      <div className="px-7 mt-4 grid grid-cols-2 gap-4 pb-4">
        {products.map((product) => (
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
