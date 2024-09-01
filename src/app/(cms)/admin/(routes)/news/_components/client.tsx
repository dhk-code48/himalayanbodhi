import * as React from "react";
import getAllNews from "@/actions/news/getAllNews";
import getNewsAllCategories from "@/actions/news/getAllNewsCategories";
import getNewsCategories from "@/actions/news/getAllNewsCategories";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/dashboard/DataTable";
import NewsCategoryForm from "@/components/forms/NewsCategoryForm";

import Action from "./action";
import { columns } from "./columns";

interface NewsCategoriesClientProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Client({ className, ...props }: NewsCategoriesClientProps) {
  return (
    <div className={cn(className)} {...props}>
      <Client.Action />
      <Client.Body />
    </div>
  );
}

Client.Action = function FormComponent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const categories = React.use(getNewsAllCategories());
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
  const data = React.use(getAllNews({}));
  const allCategories = React.use(getNewsAllCategories());
  const columnsData = data.map((i) => ({ ...i, allCategories }));
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={columnsData} />
    </div>
  );
};
