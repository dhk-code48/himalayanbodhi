"use client";

import React from "react";
import { NewsCategory } from "@prisma/client";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = ({ categories }: { categories: NewsCategory[] }) => {
  const { setNewsModal, setNewsValues } = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setNewsValues({
            categories,
          });
          setNewsModal(true);
        }}
      >
        Create New News <Icons.news size={20} />
      </Button>
    </div>
  );
};

export default Action;
