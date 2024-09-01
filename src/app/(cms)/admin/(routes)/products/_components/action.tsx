"use client";

import React from "react";
import { ProductCategory, ProductSubCategory } from "@prisma/client";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = ({
  categories,
}: {
  categories: (ProductCategory & { subCategories: ProductSubCategory[] })[];
}) => {
  const { setProductModal, setProductValues } = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setProductValues({
            categories,
          });
          setProductModal(true);
        }}
      >
        Create New Product <Icons.product size={20} />
      </Button>
    </div>
  );
};

export default Action;
