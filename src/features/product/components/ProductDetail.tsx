import { ProductCardProps } from "@/types/product.types";
import { toRupiah } from "@/utils/toRupiah";
import Image from "next/image";
import React from "react";

const ProductDetail = ({ image, name, category, price }: ProductCardProps) => {
  return (
    <div className="flex w-full flex-col border border-black">
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
    </div>
  );
};

export default ProductDetail;
