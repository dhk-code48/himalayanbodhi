import * as React from "react";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/dashboard/DataTable";

import Action from "./action";
import { columns } from "./columns";

// Props interface updated to include billboards and categories
interface NewsCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  billboards: any[]; // Replace 'any' with the actual type of billboards
  categories: any[]; // Replace 'any' with the actual type of categories
}

export function Client({
  billboards,
  categories,
  className,
  ...props
}: NewsCategoriesClientProps) {
  const columnsData = categories.map((i) => ({
    ...i,
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
}: React.HTMLAttributes<HTMLDivElement> & { billboards: any[] }) {
  return (
    <div
      className={cn("flex w-full justify-start md:justify-end", className)}
      {...props}
    >
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
