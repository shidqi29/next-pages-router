import React from "react";

import Navbar from "../Navbar";
import { useRouter } from "next/router";

type AppShellProps = {
  children: React.ReactNode;
};

// digunakan sebagai layout untuk semua halaman yang membungkus _app.tsx
const AppShell = ({ children }: AppShellProps) => {
  const router = useRouter();

  const disableNavbarPaths = ["/auth/login", "/auth/register"];

  return (
    <>
      {!disableNavbarPaths.includes(router.pathname) && <Navbar />}
      <main className="relative mx-auto flex min-h-screen flex-col px-4 md:px-8">
        {children}
      </main>
    </>
  );
};

export default AppShell;
