import React from "react";
import { useRouter } from "next/router";
import { useGetProductQuery } from "@/features/product/api/useGetProductQuery";
import ProductDetail from "@/features/product/components/ProductDetail";
import axios from "axios";
import { ProductCardProps } from "@/types/product.types";

export default function DetailProductPage({
  product,
}: {
  product: ProductCardProps;
}) {
  // client side fetching
  // const router = useRouter();
  // const { data: product, isLoading } = useGetProductQuery(
  //   router.query.id as string,
  // ); // dynamic routing

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* client side fetching */}
      {/* <ProductDetail
        name={product.data.name}
        category={product.data.category}
        image={product.data.image}
        price={product.data.price}
        id=""
      /> */}
      {/* server side & ssg fetching */}
      <ProductDetail
        name={product.name}
        category={product.category}
        image={product.image}
        price={product.price}
        id=""
      />
    </div>
  );
}

// fetching data from server side
// export async function getServerSideProps({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/products/${params.id}`,
//   );

//   return {
//     props: {
//       product: data.data,
//     },
//   };
// }

// static site generation
// when we use static site generation, we can't use dynamic routing
// we have to use getStaticPaths and getStaticProps
// getStaticPaths is used to generate all the paths that we want to generate
// getStaticProps is used to get the data from the paths that we generate
// we can use fallback: true to generate the paths that we didn't generate
// fallback: true is used to generate the paths that we didn't generate
// fallback: false is used to return 404 if the paths that we didn't generate is accessed
// fallback: blocking is used to generate the paths that we didn't generate
// but it will wait until the paths is generated

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:3000/api/products");

  const paths = data.data.map((product: ProductCardProps) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${params.id}`,
  );

  return {
    props: {
      product: data.data,
    },
  };
}
