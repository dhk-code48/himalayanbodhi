import * as React from "react";
import getAllProductBillboards from "@/actions/products/getAllProductBillboard";
import getAllProductCategories from "@/actions/products/getAllProductCategories";
import getAllProductSubCategories from "@/actions/products/getAllProductSubCategories";

import { DataTable } from "@/components/dashboard/DataTable";

import Action from "./action";
import { columns } from "./columns";

interface NewsCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Client({ className, ...props }: NewsCategoriesClientProps) {
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
  const categories = React.use(getAllProductCategories({}));
  return <Action categories={categories} />;
};

Client.Body = function BodyComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const data = React.use(getAllProductSubCategories());
  const categories = React.use(
    getAllProductCategories({ subCategories: true }),
  );
  const columnsData = data.map((e) => ({ ...e, allCategories: categories }));
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={columnsData} />
    </div>
  );
};
