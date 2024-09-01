"use client";

import React from "react";
import { ProductCategory } from "@prisma/client";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = ({ categories }: { categories: ProductCategory[] }) => {
  const { setProductSubCategoryModal, setProductSubCategoryValues } =
    useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setProductSubCategoryValues({
            categories,
            subCategory: undefined,
          });
          setProductSubCategoryModal(true);
        }}
      >
        Create New SubCategory <Icons.productSubCategory size={18} />
      </Button>
    </div>
  );
};

export default Action;
