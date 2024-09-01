import * as React from "react";
import getNewsAllBillboards from "@/actions/news/getAllNewsBillboards";
import getNewsCategories from "@/actions/news/getAllNewsCategories";

import { DataTable } from "@/components/dashboard/DataTable";
import NewsCategoryForm from "@/components/forms/NewsCategoryForm";

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
  const billboards = React.use(getNewsAllBillboards());
  return (
    <div className={className} {...props}>
      <Action billboards={billboards} />
    </div>
  );
};

Client.Body = function BodyComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const data = React.use(getNewsCategories());
  const allBillboards = React.use(getNewsAllBillboards());
  const columnsData = data.map((i) => ({ ...i, allBillboards }));
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={columnsData} />
    </div>
  );
};
