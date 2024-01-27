import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <p>
        Register <Link href="/auth/register">disini</Link>
      </p>
    </div>
  );
}
