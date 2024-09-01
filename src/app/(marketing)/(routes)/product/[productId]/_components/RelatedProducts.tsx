import React, { use } from "react";
import getRelatedProducts from "@/actions/products/getRelatedProducts";

import RelatedProductCard from "./RelatedProductCard";

const RelatedProducts = ({ categoryId }: { categoryId: number }) => {
  const products = use(getRelatedProducts({ categoryId }));
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <RelatedProductCard
          key={"related-product-" + product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
