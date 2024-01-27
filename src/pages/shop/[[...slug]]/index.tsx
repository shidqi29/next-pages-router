import { useRouter } from "next/router";
import React from "react";

{
  /* dynamic routing & get all segments params 
  kalo tanda kurung siku 1, maka akan mengambil segment params pertama
  kalo tanda kurung siku 2, maka akan mengambil semua segment params
  */
}

export default function ShopPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Shop Page</h1>
      <p>Slug: {router.query.slug ? router.query.slug : "Shop"}</p>
    </div>
  );
}
