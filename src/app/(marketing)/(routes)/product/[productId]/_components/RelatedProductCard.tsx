"use client";

import React, { useState } from "react";
import { Image, Product } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";

import { ProductCard, QuickViewModal } from "@/components/layout/ProductCard";

const RelatedProductCard = ({
  product,
}: {
  product: Product & { images: Image[] };
}) => {
  const [selectedProduct, setSelectedProduct] = useState<
    (Product & { images: Image[] }) | null
  >(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product: Product & { images: Image[] }) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <ProductCard openQuickView={openQuickView} product={product} />

      <AnimatePresence>
        {isQuickViewOpen && selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            closeQuickView={closeQuickView}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RelatedProductCard;
