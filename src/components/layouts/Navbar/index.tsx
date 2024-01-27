import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[8vh] bg-slate-600">
      <nav className="flex w-full items-center justify-between px-6 md:px-12">
        <ul className="flex gap-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
        <Link href="/auth/login">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;
