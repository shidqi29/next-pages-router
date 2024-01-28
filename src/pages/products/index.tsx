
import ProductSection from "@/features/product/components/ProductSection";
import React from "react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="text-gray-500">List of available products</p>
      <div className="">
        <ProductSection />
      </div>
    </div>
  );
}
