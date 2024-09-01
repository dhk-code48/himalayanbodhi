import * as React from "react";
import getNewsAllBillboards from "@/actions/news/getAllNewsBillboards";
import getNewsCategories from "@/actions/news/getAllNewsCategories";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/DataTable";
import { NewsBillboardForm } from "@/components/forms/NewsBillboardForm";
import NewsCategoryForm from "@/components/forms/NewsCategoryForm";
import { Icons } from "@/components/shared/Icons";

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
  const data = React.use(getNewsAllBillboards());
  return (
    <div className={className} {...props}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
