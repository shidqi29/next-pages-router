import ProductList from "@/features/product/components/ProductList";
import { ProductCardProps } from "@/types/product.types";
import axios from "axios";
import React from "react";

export default function StaticProductPage({
  products,
}: {
  products: ProductCardProps[];
}) {
  return (
    <div>
      <h1>Static Product Page</h1>
      <ProductList data={products} />
    </div>
  );
}

{
  /*the difference between getServerSideProps and getStaticProps is that getServerSideProps 
  will fetch data on every request, while getStaticProps will fetch data at build time.
   */
}
export async function getStaticProps() {
  const { data } = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: data.data,
    },
  };
}
