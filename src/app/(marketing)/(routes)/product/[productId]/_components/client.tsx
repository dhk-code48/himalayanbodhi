import React, { Suspense, use } from "react";
import getProduct from "@/actions/products/getProduct";
import { CldImage } from "next-cloudinary";

import { Badge } from "@/components/ui/badge";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { ProductsSkeleton } from "@/components/shared/SectionSkeleton";

import ProductImages from "./ProductImages";
import RelatedProducts from "./RelatedProducts";

const Client = ({ id }: { id: number }) => {
  const product = use(getProduct(id));
  return (
    <>
      <MaxWidthWrapper
        large
        className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2"
      >
        <ProductImages images={product.images} />
        <div className="space-y-5">
          <div className="space-y-1">
            <h1 className="font-display text-lg font-bold md:text-xl">
              {product.name}
            </h1>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="select-none space-x-2 py-2">
              <Badge>{product.category.name}</Badge>
              <Badge>{product.subCategory.name}</Badge>
            </div>
            <div
              className="prose" // Tailwind CSS class for styled content
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="my-20 space-y-5">
        <h1 className="font-display text-xl font-semibold">Related Products</h1>
        <ErrorBoundary>
          <Suspense fallback={<ProductsSkeleton />}>
            <RelatedProducts categoryId={product.categoryId} />
          </Suspense>
        </ErrorBoundary>
      </MaxWidthWrapper>
    </>
  );
};

export default Client;
