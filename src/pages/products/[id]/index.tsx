import React from "react";
import { useRouter } from "next/router";

export default function DetailProductPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Detail Product: {router.query.id}</h1> {/* dynamic routing */}
    </div>
  );
}
