import * as React from "react";
import getAllProductBillboards from "@/actions/products/getAllProductBillboard";
import getAllProductCategories from "@/actions/products/getAllProductCategories";
import { ProductBillboard } from "@prisma/client";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/dashboard/DataTable";

import Action from "./action";
import { columns } from "./columns";

interface ProductCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  billboards: ProductBillboard[];
  categories: any[];
}

export async function fetchProductBillboards() {
  return await getAllProductBillboards();
}

export async function fetchProductCategories() {
  return await getAllProductCategories({ billboard: true });
}

export function Client({
  billboards,
  categories,
  className,
  ...props
}: ProductCategoriesClientProps) {
  const columnsData = categories.map((e) => ({
    ...e,
    allBillboards: billboards,
  }));

  return (
    <div className={cn("space-x-2 space-y-2", className)} {...props}>
      <Client.Action billboards={billboards} />
      <Client.Body data={columnsData} />
    </div>
  );
}

Client.Action = function ActionComponent({
  billboards,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { billboards: ProductBillboard[] }) {
  return (
    <div
      className={cn("flex w-full justify-start md:justify-end", className)}
      {...props}
    >
      {" "}
      <Action billboards={billboards} />
    </div>
  );
};

Client.Body = function BodyComponent({
  data,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { data: any[] }) {
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
