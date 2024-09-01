import React, { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { sidebarLinks } from "@/config/dashboard";

import ModalProvider from "@/provider/ModalProvider";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/dashboard/Sidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { UserAccountNav } from "@/components/layout/UserAccountNav";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const CMSLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <ModalProvider>
      <div className="relative flex min-h-screen w-full">
        <DashboardSidebar links={sidebarLinks} />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 flex h-14 w-full border-b bg-background px-4 lg:h-[60px] xl:px-8">
            <MaxWidthWrapper className="flex max-w-7xl items-center justify-end gap-x-3 px-0">
              <MobileSheetSidebar links={sidebarLinks} />
              <ModeToggle />
              <UserAccountNav />
            </MaxWidthWrapper>
          </header>

          <main className="flex-1 p-4 xl:px-8">
            <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
              {children}
            </MaxWidthWrapper>
          </main>
        </div>
      </div>
    </ModalProvider>
  );
};

export default CMSLayout;
