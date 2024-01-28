import React from "react";

import ProductCard from "./ProductCard";
import { ProductListProps } from "@/types/product.types";

const ProductList = ({ data: products }: ProductListProps) => {
  if (!products) return null;

  return products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      image={product.image}
      category={product.category}
      name={product.name}
      price={product.price}
    />
  ));
};

export default ProductList;
