import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const session = useSession();

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
        <div className="flex items-center gap-x-4">
          {session.data?.user && (
            <div className="flex items-center gap-x-2">
              <Image
                src={session.data.user.image ?? ""}
                alt={
                  (session.data.user as { username?: string }).username ?? ""
                }
                width={40}
                height={40}
                className="rounded-full"
              />
              <p>{(session.data.user as { username?: string }).username}</p>
            </div>
          )}
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
