import React, { Suspense } from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import {
  Client,
  fetchProductCategories,
  fetchProductSubCategories,
} from "./_components/client";

// Fetch all data in parallel
async function fetchAllProductData() {
  const [categories, subCategories] = await Promise.all([
    fetchProductCategories(),
    fetchProductSubCategories(),
  ]);
  return { categories, subCategories };
}

// Loader component using Suspense
function ClientWithSuspense() {
  const { categories, subCategories } = React.use(fetchAllProductData());

  return <Client categories={categories} subCategories={subCategories} />;
}

const CMSProducts = () => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5 md:items-center">
        <DashboardHeading
          heading="Products SubCategory"
          text="Manage your page products sub category here"
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
