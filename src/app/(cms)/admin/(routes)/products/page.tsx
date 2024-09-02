import React, { Suspense } from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import {
  Client,
  fetchProductCategories,
  fetchProducts,
} from "./_components/client";

// Fetch all data in parallel
async function fetchAllProductData() {
  const [categories, data] = await Promise.all([
    fetchProductCategories(),
    fetchProducts(),
  ]);
  return { categories, data };
}

// Loader component using Suspense
function ClientWithSuspense() {
  const { categories, data } = React.use(fetchAllProductData());

  return <Client categories={categories} data={data} />;
}

const CMSProducts = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeading
          heading="Products"
          text="Manage your page products here"
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
