"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProducts, updateProductAction, createProductAction } from "@/lib/actions/admin";
import { useToast } from "@/lib/context/ToastContext";

type Product = Awaited<ReturnType<typeof getAllProducts>>[0];

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const { showToast } = useToast();

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleToggleAvailability = async (product: Product) => {
    const formData = new FormData();
    formData.set("name", product.name);
    formData.set("price", product.price.toString());
    formData.set("available", (!product.available).toString());
    await updateProductAction(product.id, formData);
    showToast(`${product.name} ${product.available ? "disabled" : "enabled"}`);
    fetchProducts();
  };

  const handleAddProduct = async (formData: FormData) => {
    const result = await createProductAction(formData);
    if (result.error) {
      showToast(result.error, "error");
    } else {
      showToast("Product added");
      setShowAdd(false);
      fetchProducts();
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F9F2ED] pt-20 text-center text-[#9B9B9B]">Loading...</div>;

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Inventory</h1>
          <p className="text-[12px] text-[#9B9B9B] mt-1">{products.length} products</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[#C67C4E] text-white text-[12px] font-semibold px-4 h-[36px] rounded-xl"
        >
          {showAdd ? "Cancel" : "+ Add"}
        </button>
      </div>

      <div className="px-7 pb-4">
        {/* Add Form */}
        {showAdd && (
          <form action={handleAddProduct} className="bg-white rounded-2xl p-4 mb-4 space-y-3">
            <input name="name" placeholder="Product name" required
              className="w-full h-[42px] border border-[#DEDEDE] rounded-xl px-3 text-[13px] outline-none focus:border-[#C67C4E]" />
            <input name="subtitle" placeholder="Subtitle" required
              className="w-full h-[42px] border border-[#DEDEDE] rounded-xl px-3 text-[13px] outline-none focus:border-[#C67C4E]" />
            <textarea name="description" placeholder="Description" required
              className="w-full h-[60px] border border-[#DEDEDE] rounded-xl px-3 py-2 text-[13px] outline-none focus:border-[#C67C4E] resize-none" />
            <div className="flex gap-3">
              <input name="price" type="number" step="0.01" placeholder="Price" required
                className="flex-1 h-[42px] border border-[#DEDEDE] rounded-xl px-3 text-[13px] outline-none focus:border-[#C67C4E]" />
              <input name="category" placeholder="Category" required
                className="flex-1 h-[42px] border border-[#DEDEDE] rounded-xl px-3 text-[13px] outline-none focus:border-[#C67C4E]" />
            </div>
            <button type="submit" className="w-full bg-[#C67C4E] text-white text-[13px] font-semibold h-[42px] rounded-xl">
              Add Product
            </button>
          </form>
        )}

        {/* Product List */}
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
                onClick={() => handleToggleAvailability(product)}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${
                  product.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
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
