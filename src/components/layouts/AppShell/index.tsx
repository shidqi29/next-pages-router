import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

type AppShellProps = {
  children: React.ReactNode;
};

// menggunakan dynamic import untuk mengimpor Navbar agar tidak membebani halaman yang tidak membutuhkan Navbar (Optimasi SSR)
const Navbar = dynamic(() => import("../Navbar"));

const roboto = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// digunakan sebagai layout untuk semua halaman yang membungkus _app.tsx
const AppShell = ({ children }: AppShellProps) => {
  const router = useRouter();

  const disableNavbarPaths = ["/auth/login", "/auth/register"];

  return (
    <>
      {!disableNavbarPaths.includes(router.pathname) && <Navbar />}
      <main
        className={`${roboto.className} relative mx-auto flex min-h-screen flex-col px-4 md:px-8`}
      >
        {children}
      </main>
    </>
  );
};

export default AppShell;
