import * as React from "react";
import getAllProductCategories from "@/actions/products/getAllProductCategories";
import getAllProducts from "@/actions/products/getAllProducts";

import { DataTable } from "@/components/dashboard/DataTable";
import ProductCategoryForm from "@/components/forms/ProductCategoryForm";

import Action from "./action";
import { columns } from "./columns";

interface ProductCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Client({ className, ...props }: ProductCategoriesClientProps) {
  return (
    <div className={className} {...props}>
      <Client.Action />
      <Client.Body />
    </div>
  );
}

Client.Action = function FormComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const categories = React.use(
    getAllProductCategories({ subCategories: true }),
  );

  return (
    <div className={className} {...props}>
      <Action categories={categories} />
    </div>
  );
};

Client.Body = function BodyComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const data = React.use(getAllProducts());
  const allCategories = React.use(
    getAllProductCategories({ subCategories: true }),
  );
  const columnsData = data.map((i) => ({ ...i, allCategories }));
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={columnsData} />
    </div>
  );
};
