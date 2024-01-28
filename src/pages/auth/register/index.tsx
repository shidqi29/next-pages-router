import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <p>
        masuk <Link href="/auth/login">disini</Link>
      </p>
    </div>
  );
}
