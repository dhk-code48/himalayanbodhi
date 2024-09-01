import * as React from "react";
import getAllProductBillboards from "@/actions/products/getAllProductBillboard";

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
  return <Action />;
};

Client.Body = function BodyComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const data = React.use(getAllProductBillboards());
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
