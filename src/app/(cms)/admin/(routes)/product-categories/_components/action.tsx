"use client";

import React from "react";
import { ProductBillboard } from "@prisma/client";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = ({ billboards }: { billboards: ProductBillboard[] }) => {
  const { setProductCategoryModal, setProductCategoryValues } = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setProductCategoryValues({
            category: undefined,
            billboards,
          });
          setProductCategoryModal(true);
        }}
      >
        Create New Category <Icons.productCategory size={18} />
      </Button>
    </div>
  );
};

export default Action;
