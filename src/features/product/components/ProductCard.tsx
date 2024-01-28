import Image from "next/image";
import React from "react";
import Link from "next/link";

import { toRupiah } from "@/utils/toRupiah";
import { ProductCardProps } from "@/types/product.types";

const ProductCard = ({
  id,
  image,
  name,
  category,
  price,
}: ProductCardProps) => {
  return (
    <Link
      className="flex w-full flex-col border border-black"
      href={`/products/${id}`}
    >
      <Image
        src={image}
        alt={name}
        width={180}
        height={120}
        className="object-cover"
      />
      <div className="flex flex-col">
        <h3 className="text-red-700">{name}</h3>
        <p>{category}</p>
        <p>{toRupiah(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
