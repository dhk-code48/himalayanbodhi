import * as React from "react";
import getAllProductBillboards from "@/actions/products/getAllProductBillboard";
import getAllProductCategories from "@/actions/products/getAllProductCategories";
import { ProductBillboard } from "@prisma/client";

import { DataTable } from "@/components/dashboard/DataTable";

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

Client.Action = function FormComponent() {
  const billboards = React.use(getAllProductBillboards());

  return <Action billboards={billboards} />;
};

Client.Body = function BodyComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const data = React.use(getAllProductCategories({ billboard: true }));
  const billboards = React.use(getAllProductBillboards());

  const columnsData = data.map((e) => ({ ...e, allBillboards: billboards }));
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={columnsData} />
    </div>
  );
};
