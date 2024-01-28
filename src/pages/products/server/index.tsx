import ProductList from "@/features/product/components/ProductList";
import { ProductCardProps } from "@/types/product.types";
import axios from "axios";
import React from "react";

export default function ServerProductsPage({
  products,
}: {
  products: ProductCardProps[];
}) {
  return (
    <div>
      <h1 className="text-red-700">Server Products Page</h1>
      <ProductList data={products} />
    </div>
  );
}
// fetching data from server side
export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: data.data,
    },
  };
}
