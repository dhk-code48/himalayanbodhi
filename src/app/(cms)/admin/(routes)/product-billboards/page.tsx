import React, { Suspense } from "react";
import getAllProductBillboards from "@/actions/products/getAllProductBillboard";
import getAllProductCategories from "@/actions/products/getAllProductCategories";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { Client } from "./_components/client";

async function fetchAllProductData() {
  const [billboards, categories] = await Promise.all([
    getAllProductBillboards(),
    getAllProductCategories({ billboard: true }),
  ]);
  return { billboards, categories };
}

function ClientWithSuspense() {
  const { billboards, categories } = React.use(fetchAllProductData());

  return <Client billboards={billboards} categories={categories} />;
}
const CMSProducts = () => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5 md:items-center">
        <DashboardHeading
          heading="Products Billboards"
          text="Manage your page products billboards here"
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
