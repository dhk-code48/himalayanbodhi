"use client";

import React from "react";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = () => {
  const { setProductBillboardModal, setProductBillboardValues } = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setProductBillboardValues(undefined);
          setProductBillboardModal(true);
        }}
      >
        Create New Billboard <Icons.mediaFilled size={18} />
      </Button>
    </div>
  );
};

export default Action;
