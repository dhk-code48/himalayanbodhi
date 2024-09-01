import React, { FC } from "react";

import Client from "./_components/client";

interface pageProps {
  params: {
    productId: string;
  };
}

const ProductPage: FC<pageProps> = ({ params }) => {
  return (
    <>
      <Client id={parseInt(params.productId)} />
    </>
  );
};

export default ProductPage;
