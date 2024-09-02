import React, { Suspense } from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import {
  Client,
  fetchProductBillboards,
  fetchProductCategories,
} from "./_components/client";

// Fetch all data in parallel
async function fetchAllProductData() {
  const [billboards, categories] = await Promise.all([
    fetchProductBillboards(),
    fetchProductCategories(),
  ]);
  return { billboards, categories };
}

// Loader component using Suspense
function ClientWithSuspense() {
  const { billboards, categories } = React.use(fetchAllProductData());

  return <Client billboards={billboards} categories={categories} />;
}

const CMSProducts = () => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5 md:items-center">
        <DashboardHeading
          heading="Products Category"
          text="Manage your page products category here"
        />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <ClientWithSuspense />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CMSProducts;
