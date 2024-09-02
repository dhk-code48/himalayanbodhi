import * as React from "react";
import getAllProductCategories from "@/actions/products/getAllProductCategories";
import getAllProducts from "@/actions/products/getAllProducts";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/dashboard/DataTable";

import Action from "./action";
import { columns } from "./columns";

interface ProductCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  categories: any[];
  data: any[];
}

export async function fetchProductCategories() {
  return await getAllProductCategories({ subCategories: true });
}

export async function fetchProducts() {
  return await getAllProducts();
}

export function Client({
  categories,
  data,
  className,
  ...props
}: ProductCategoriesClientProps) {
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
      {" "}
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
