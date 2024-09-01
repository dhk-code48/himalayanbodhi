"use client";

import React from "react";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const Action = () => {
  const { setNewsBillboardModal, setNewsBillboardValues } = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          setNewsBillboardValues(undefined);
          setNewsBillboardModal(true);
        }}
      >
        Create New Billboard <Icons.media size={20} />
      </Button>
    </div>
  );
};

export default Action;
