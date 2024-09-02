import React, { Suspense } from "react";
import getNewsAllBillboards from "@/actions/news/getAllNewsBillboards";

import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { Client } from "./_components/client";

async function fetchAllData() {
  const billboards = await getNewsAllBillboards();
  return { billboards };
}

function ClientWithSuspense() {
  const { billboards } = React.use(fetchAllData());

  return <Client billboards={billboards} />;
}

const CMSNews = () => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5 md:items-center">
        <DashboardHeading
          heading="News Billboards"
          text="Manage your page news billboards here"
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

export default CMSNews;
