"use client";

import { Dispatch, SetStateAction } from "react";
// import { useRouter } from "next/router";
import { Drawer } from "vaul";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
}

export function Modal({ children, className, open: showModal, onOpenChange: setShowModal, onClose, desktopOnly, preventDefaultClose }: ModalProps) {
  // const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }
    // fire onClose event if provided
    onClose && onClose();

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false);
    }
    // else, this is intercepting route @modal
    // else {
    // router.back();
    // }
  };
  const { isMobile } = useMediaQuery();

  return (
    <Dialog
      modal={false}
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn("p-0 md:rounded-2xl md:border", className)}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
