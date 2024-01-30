import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const session = useSession();

  console.log(session);

  const navItems = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Products",
      link: "/products",
    },
  ];

  return (
    <header className="sticky top-0 z-10 flex h-[8vh] bg-slate-600 text-white">
      <nav className="flex w-full items-center justify-between px-6 md:px-12">
        <ul className="flex gap-x-4">
          {navItems.map((navItem) => (
            <li key={navItem.link}>
              <Link href={navItem.link} className="hover:text-slate-400">
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>
        {session.status === "authenticated" ? (
          <button
            className="rounded-md border px-4 py-1"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          <button
            className="rounded-md border px-4 py-1"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
