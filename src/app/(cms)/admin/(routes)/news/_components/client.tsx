import * as React from "react";
import getAllNews from "@/actions/news/getAllNews";
import getAllNewsCategories from "@/actions/news/getAllNewsCategories";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/dashboard/DataTable";

import Action from "./action";
import { columns } from "./columns";

interface NewsCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  categories: any[];
  data: any[];
}

export async function fetchCategories() {
  return await getAllNewsCategories();
}

export async function fetchNewsData() {
  return await getAllNews({});
}

export function Client({
  categories,
  data,
  className,
  ...props
}: NewsCategoriesClientProps) {
  const columnsData = data.map((i) => ({ ...i, allCategories: categories }));

  return (
    <div className={cn("space-x-2 space-y-2", className)} {...props}>
      <Client.Action categories={categories} />
      <Client.Body data={columnsData} />
    </div>
  );
}

Client.Action = function ActionComponent({
  categories,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { categories: any[] }) {
  return (
    <div
      className={cn("flex w-full justify-start md:justify-end", className)}
      {...props}
    >
      <Action categories={categories} />
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
