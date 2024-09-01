import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ProductBillboard } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import { ProductBillboardForm } from "@/components/forms/ProductBillboardForm";
import { Icons } from "@/components/shared/Icons";

function ProductBillboardModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues?: ProductBillboard;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-1 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
          <Icons.media className="size-10" />
          <h3 className="font-display text-2xl font-bold">
            Product Billboards
          </h3>
          <p className="text-sm text-gray-500">
            Create and update billboards for product
          </p>
        </div>

        <ProductBillboardForm initialValues={initialValues} />
      </div>
    </Modal>
  );
}

export function useProductBillboardModal() {
  const [open, setOpen] = useState(false);

  const ProductBillboardModalCallback = useCallback(
    ({ initialValues }: { initialValues?: ProductBillboard }) => {
      return (
        <ProductBillboardModal
          open={open}
          setOpen={setOpen}
          initialValues={initialValues}
        />
      );
    },
    [open, setOpen],
  );

  return useMemo(
    () => ({
      setProductBillboardModal: setOpen,
      ProductBillboardModal: ProductBillboardModalCallback,
    }),
    [setOpen, ProductBillboardModalCallback],
  );
}
