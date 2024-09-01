import React, { Suspense } from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { Client } from "./_components/client";

const CMSProducts = () => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5 md:items-center">
        <DashboardHeading
          heading="Products Billboards"
          text="Manage your page products billboards here"
        />
        <Client.Action />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
          <Client.Body />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CMSProducts;
