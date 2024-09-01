"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  News,
  NewsBillboard,
  NewsCategory,
  Product,
  ProductBillboard,
  ProductCategory,
  ProductSubCategory,
} from "@prisma/client";

import { useNewsModal } from "@/components/modals/NewsFormModal";
import { useProductBillboardModal } from "@/components/modals/ProductBillboardFormModal";
import { useProductCategoryModal } from "@/components/modals/ProductCategoryFormModal";
import { useProductModal } from "@/components/modals/ProductFormModal";
import { useProductSubCategoryModal } from "@/components/modals/ProductSubCategoryFormModal";

import { useDeleteModal } from "../components/modals/DeleteItemModal";
import { useNewsBillboardModal } from "../components/modals/NewsBillboardFormModal";
import { useNewsCategoryModal } from "../components/modals/NewsCategoryFormModal";

export const ModalContext = createContext<{
  setNewsBillboardModal: Dispatch<SetStateAction<boolean>>;
  setNewsCategoryModal: Dispatch<SetStateAction<boolean>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setNewsModal: Dispatch<SetStateAction<boolean>>;
  setProductBillboardModal: Dispatch<SetStateAction<boolean>>;
  setProductSubCategoryModal: Dispatch<SetStateAction<boolean>>;
  setProductCategoryModal: Dispatch<SetStateAction<boolean>>;
  setProductModal: Dispatch<SetStateAction<boolean>>;

  setNewsBillboardValues: Dispatch<SetStateAction<NewsBillboard | undefined>>;
  setNewsCategoryValues: Dispatch<
    SetStateAction<{ category?: NewsCategory; billboards: NewsBillboard[] }>
  >;
  setNewsValues: Dispatch<
    SetStateAction<{ news?: News; categories: NewsCategory[] }>
  >;
  setProductSubCategoryValues: Dispatch<
    SetStateAction<{
      subCategory?: ProductSubCategory;
      categories: ProductCategory[];
    }>
  >;
  setProductCategoryValues: Dispatch<
    SetStateAction<{
      category?: ProductCategory;
      billboards: ProductBillboard[];
    }>
  >;
  setProductBillboardValues: Dispatch<
    SetStateAction<ProductBillboard | undefined>
  >;
  setProductValues: Dispatch<
    SetStateAction<{
      product?: Product;
      categories: (ProductCategory & { subCategories: ProductSubCategory[] })[];
    }>
  >;

  setDeleteAction: Dispatch<SetStateAction<(() => Promise<any>) | undefined>>;
}>({
  setNewsBillboardModal: () => {},
  setNewsCategoryModal: () => {},
  setDeleteModal: () => {},
  setNewsModal: () => {},
  setProductBillboardModal: () => {},
  setProductCategoryModal: () => {},
  setProductSubCategoryModal: () => {},
  setProductModal: () => {},

  setProductBillboardValues: () => {},
  setNewsBillboardValues: () => {},
  setNewsCategoryValues: () => {},
  setNewsValues: () => {},
  setProductSubCategoryValues: () => {},
  setProductCategoryValues: () => {},
  setProductValues: () => {},

  setDeleteAction: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { NewsBillboardModal, setNewsBillboardModal } = useNewsBillboardModal();
  const { NewsCategoryModal, setNewsCategoryModal } = useNewsCategoryModal();
  const { NewsModal, setNewsModal } = useNewsModal();
  const { ProductBillboardModal, setProductBillboardModal } =
    useProductBillboardModal();
  const { ProductCategoryModal, setProductCategoryModal } =
    useProductCategoryModal();
  const { ProductSubCategoryModal, setProductSubCategoryModal } =
    useProductSubCategoryModal();
  const { ProductModal, setProductModal } = useProductModal();

  const { DeleteModal, setDeleteModal } = useDeleteModal();

  const [deleteFunction, setDeleteAction] = useState<
    (() => Promise<void>) | undefined
  >();

  const [newsBillboardValues, setNewsBillboardValues] =
    useState<NewsBillboard>();
  const [newsCategoryValues, setNewsCategoryValues] = useState<{
    category?: NewsCategory;
    billboards: NewsBillboard[];
  }>({ billboards: [] });
  const [productCategoryValues, setProductCategoryValues] = useState<{
    category?: ProductCategory;
    billboards: ProductBillboard[];
  }>({
    billboards: [],
  });
  const [productSubCategoryValues, setProductSubCategoryValues] = useState<{
    subCategory?: ProductSubCategory;
    categories: ProductCategory[];
  }>({
    categories: [],
  });
  const [newsValues, setNewsValues] = useState<{
    news?: News;
    categories: NewsCategory[];
  }>({ categories: [] });
  const [productValues, setProductValues] = useState<{
    product?: Product;
    categories: (ProductCategory & { subCategories: ProductSubCategory[] })[];
  }>({ categories: [] });

  const [productBillboardValues, setProductBillboardValues] =
    useState<ProductBillboard>();

  return (
    <ModalContext.Provider
      value={{
        setNewsBillboardModal,
        setDeleteModal,
        setNewsCategoryModal,
        setNewsModal,
        setProductBillboardModal,
        setProductSubCategoryModal,
        setProductCategoryModal,
        setProductModal,

        setDeleteAction,

        setNewsBillboardValues,
        setNewsCategoryValues,
        setNewsValues,
        setProductBillboardValues,
        setProductCategoryValues,
        setProductSubCategoryValues,
        setProductValues,
      }}
    >
      <NewsBillboardModal initialValues={newsBillboardValues} />
      <NewsCategoryModal initialValues={newsCategoryValues} />
      <NewsModal initialValues={newsValues} />
      <ProductBillboardModal initialValues={productBillboardValues} />
      <ProductSubCategoryModal initialValues={productSubCategoryValues} />
      <ProductCategoryModal initialValues={productCategoryValues} />
      <ProductModal initialValues={productValues} />
      <DeleteModal action={deleteFunction} />
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal Context Provider Not Implemented");
  return modal;
};
