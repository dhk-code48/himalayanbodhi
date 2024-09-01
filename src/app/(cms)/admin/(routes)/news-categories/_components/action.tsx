"use client";

import React from "react";
import { NewsBillboard } from "@prisma/client";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = ({ billboards }: { billboards: NewsBillboard[] }) => {
  const { setNewsCategoryModal, setNewsCategoryValues } = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setNewsCategoryValues({
            billboards,
          });
          setNewsCategoryModal(true);
        }}
      >
        Create New Category <Icons.newsCategory size={20} />
      </Button>
    </div>
  );
};

export default Action;
