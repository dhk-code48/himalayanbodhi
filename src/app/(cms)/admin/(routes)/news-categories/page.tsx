import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeading } from "@/components/dashboard/Heading";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { SkeletonSection } from "@/components/shared/SectionSkeleton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { Client } from "./_components/client";

const NewsCategoriesPage = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <DashboardHeading
          heading="News Categories"
          text="Manage your news by creating different categories"
        />
        <ErrorBoundary>
          <Suspense fallback={<Skeleton className="h-5 w-10" />}>
            <Client.Action />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div>
        <ErrorBoundary>
          <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
            <Client.Body />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default NewsCategoriesPage;
