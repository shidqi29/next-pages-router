import Image from "next/image";
import React from "react";

import { toRupiah } from "@/utils/toRupiah";

export type ProductCardProps = {
  imageUrl: string;
  name: string;
  category: string;
  price: number;
};

const ProductCard = ({ imageUrl, name, category, price }: ProductCardProps) => {
  return (
    <article className="flex flex-col">
      <Image src={imageUrl} alt={name} width={1280} height={720} />
      <div className="flex flex-col">
        <h3>{name}</h3>
        <p>{category}</p>
        <p>{toRupiah(price)}</p>
      </div>
    </article>
  );
};

export default ProductCard;
