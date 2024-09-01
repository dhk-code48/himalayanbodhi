import React, { use } from "react";
import getAllProducts from "@/actions/products/getAllProducts";

import { sleep } from "@/lib/utils";
import Product from "@/components/layout/ProductCard";

const Client = () => {
  const products = use(getAllProducts());
  return (
    <div>
      <Product products={products} />
    </div>
  );
};

export default Client;
