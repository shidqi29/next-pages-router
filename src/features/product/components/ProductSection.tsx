import React from "react";

import ProductList from "./ProductList";
import { useGetProductsQuery } from "../api";

const ProductSection = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex w-full flex-wrap gap-x-10">
      <ProductList data={data.data} />
    </div>
  );
};

export default ProductSection;
