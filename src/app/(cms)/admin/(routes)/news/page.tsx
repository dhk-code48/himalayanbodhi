import React, { Suspense } from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { Client, fetchCategories, fetchNewsData } from "./_components/client";

// Fetch all data in parallel
async function fetchAllData() {
  const [categories, data] = await Promise.all([
    fetchCategories(),
    fetchNewsData(),
  ]);
  return { categories, data };
}

// Loader component using Suspense
function ClientWithSuspense() {
  const { categories, data } = React.use(fetchAllData());

  return <Client categories={categories} data={data} />;
}

const CMSNews = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <DashboardHeading heading="News" text="Manage your page news here" />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<TableSkeleton />}>
          <ClientWithSuspense />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CMSNews;
