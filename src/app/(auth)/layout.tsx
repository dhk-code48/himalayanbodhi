import React, { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { NavBar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const AuthLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  );
};

export default AuthLayout;
