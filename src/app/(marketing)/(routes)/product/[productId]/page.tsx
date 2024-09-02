import React, { FC, Suspense } from "react";

import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { SkeletonSection } from "@/components/shared/SectionSkeleton";

import Client from "./_components/client";

interface pageProps {
  params: {
    productId: string;
  };
}

const ProductPage: FC<pageProps> = ({ params }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonSection />}>
        <Client id={parseInt(params.productId)} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductPage;
