import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ProductBillboard, ProductCategory } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import ProductCategoryForm from "@/components/forms/ProductCategoryForm";
import { Icons } from "@/components/shared/Icons";

function ProductCategoryModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues: { category?: ProductCategory; billboards: ProductBillboard[] };
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
          <Icons.productCategory className="size-10" />
          <h3 className="font-display text-2xl font-bold">Product Category</h3>
          <p className="text-sm text-gray-500">
            Create and update category for product
          </p>
        </div>

        <ProductCategoryForm
          billboards={initialValues.billboards}
          initialValues={initialValues.category}
        />
      </div>
    </Modal>
  );
}

export function useProductCategoryModal() {
  const [open, setOpen] = useState(false);

  const ProductCategoryModalCallback = useCallback(
    ({
      initialValues,
    }: {
      initialValues: {
        category?: ProductCategory;
        billboards: ProductBillboard[];
      };
    }) => {
      return (
        <ProductCategoryModal
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
      setProductCategoryModal: setOpen,
      ProductCategoryModal: ProductCategoryModalCallback,
    }),
    [setOpen, ProductCategoryModalCallback],
  );
}
