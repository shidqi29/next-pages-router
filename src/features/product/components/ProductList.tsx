import React from "react";

import ProductCard from "./ProductCard";

export type ProductListProps = {
  data: {
    id: number;
    image: string;
    name: string;
    category: string;
    price: number;
  }[];
};

const ProductList = ({ data: products }: ProductListProps) => {
  if (!products) return null;

  return products.map((product) => (
    <ProductCard
      key={product.id}
      imageUrl={product.image}
      category={product.category}
      name={product.name}
      price={product.price}
    />
  ));
};

export default ProductList;
