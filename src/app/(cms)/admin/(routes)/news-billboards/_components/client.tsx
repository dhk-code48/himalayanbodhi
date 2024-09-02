import * as React from "react";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/dashboard/DataTable";

import Action from "./action";
import { columns } from "./columns";

interface NewsCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  billboards: any[]; // Replace `any` with the actual type of billboards
}

export function Client({
  billboards,
  className,
  ...props
}: NewsCategoriesClientProps) {
  return (
    <div className={cn("space-x-2 space-y-2", className)} {...props}>
      <Client.Action billboards={billboards} />
      <Client.Body billboards={billboards} />
    </div>
  );
}

Client.Action = function FormComponent({
  className,
  billboards,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { billboards: any[] }) {
  return (
    <div
      className={cn("flex w-full justify-start md:justify-end", className)}
      {...props}
    >
      <Action />
    </div>
  );
};

Client.Body = function BodyComponent({
  className,
  billboards,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { billboards: any[] }) {
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={billboards} />
    </div>
  );
};
