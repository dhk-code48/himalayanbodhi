import React, { Suspense } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import {
  FilterOption,
  MobileFilter,
} from "@/components/sections/FilterOptions";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import {
  ProductsSkeleton,
} from "@/components/shared/SectionSkeleton";

import Client from "./_components/client";
import ErrorBoundary from "@/components/layout/ErrorBoundary";


const ExplorePage = () => {
  return (
    <MaxWidthWrapper
      className="grid grid-cols-1 gap-x-20 py-10 lg:grid-cols-[0.25fr_1fr]"
      large
    >
      <div className="hidden lg:block">
        <FilterOption />
      </div>

      <div className="space-y-10">
        <div className="flex items-center lg:hidden">
          <Input placeholder="Search products" />
          <MobileFilter />
        </div>

        <Image
          src="/images/placeholder.png"
          width={1080}
          height={640}
          className="aspect-[27/6] rounded-lg object-cover"
          alt="banner"
        />
        <ErrorBoundary>
          <Suspense fallback={<ProductsSkeleton cards={5} />}>
            <Client />
          </Suspense>
        </ErrorBoundary>
      </div>
    </MaxWidthWrapper>
  );
};

export default ExplorePage;
