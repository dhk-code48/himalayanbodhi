import React, { Suspense } from "react";
import getNewsAllBillboards from "@/actions/news/getAllNewsBillboards";
import getNewsCategories from "@/actions/news/getAllNewsCategories";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { Client } from "./_components/client";

async function fetchAllData() {
  const [billboards, categories] = await Promise.all([
    getNewsAllBillboards(),
    getNewsCategories(),
  ]);
  return { billboards, categories };
}

function ClientWithSuspense() {
  const { billboards, categories } = React.use(fetchAllData());

  return <Client billboards={billboards} categories={categories} />;
}

const NewsCategoriesPage = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <DashboardHeading
          heading="News Categories"
          text="Manage your news by creating different categories"
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

export default NewsCategoriesPage;
