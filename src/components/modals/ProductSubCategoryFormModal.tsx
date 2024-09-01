import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ProductCategory, ProductSubCategory } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import ProductSubCategoryForm from "@/components/forms/ProductSubCategoryForm";
import { Icons } from "@/components/shared/Icons";

function ProductSubCategoryModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues: {
    subCategory?: ProductSubCategory;
    categories: ProductCategory[];
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
          <Icons.productSubCategory className="size-10" />
          <h3 className="font-display text-2xl font-bold">
            Product Sub Category
          </h3>
          <p className="text-sm text-gray-500">
            Create and update sub category for products
          </p>
        </div>

        <ProductSubCategoryForm
          productCategories={initialValues.categories}
          initialValues={initialValues.subCategory}
        />
      </div>
    </Modal>
  );
}

export function useProductSubCategoryModal() {
  const [open, setOpen] = useState(false);

  const ProductSubCategoryModalCallback = useCallback(
    ({
      initialValues,
    }: {
      initialValues: {
        subCategory?: ProductSubCategory;
        categories: ProductCategory[];
      };
    }) => {
      return (
        <ProductSubCategoryModal
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
      setProductSubCategoryModal: setOpen,
      ProductSubCategoryModal: ProductSubCategoryModalCallback,
    }),
    [setOpen, ProductSubCategoryModalCallback],
  );
}
