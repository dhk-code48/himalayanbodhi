import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Product, ProductCategory, ProductSubCategory } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import ProductForm from "@/components/forms/ProductForm";
import { Icons } from "@/components/shared/Icons";

function ProductModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues: {
    product?: Product;
    categories: (ProductCategory & { subCategories: ProductSubCategory[] })[];
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onOpenChange={setOpen} className="w-screen">
      <div className="flex flex-col items-center justify-center space-y-3 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
        <Icons.product className="size-10" />
        <h3 className="font-display text-2xl font-bold">Product</h3>
        <p className="text-sm text-gray-500">Create and update product</p>
      </div>

      <ProductForm
        categories={initialValues.categories}
        initialValues={initialValues.product}
      />
    </Modal>
  );
}

export function useProductModal() {
  const [open, setOpen] = useState(false);

  const ProductModalCallback = useCallback(
    ({
      initialValues,
    }: {
      initialValues: {
        category?: Product;
        categories: (ProductCategory & {
          subCategories: ProductSubCategory[];
        })[];
      };
    }) => {
      return (
        <ProductModal
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
      setProductModal: setOpen,
      ProductModal: ProductModalCallback,
    }),
    [setOpen, ProductModalCallback],
  );
}
