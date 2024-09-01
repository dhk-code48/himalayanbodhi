"use client";

import deleteProduct from "@/actions/products/deleteProduct";
import { weekdays } from "@/config";
import { Product, ProductCategory, ProductSubCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CldImage } from "next-cloudinary";
import { toast } from "sonner";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/shared/Icons";

export const columns: ColumnDef<
  Product & {
    allCategories: (ProductCategory & {
      subCategories: ProductSubCategory[];
    })[];
  }
>[] = [
  {
    accessorKey: "seoImage",
    header: "Image",
    cell: ({ row }) => (
      <CldImage
        src={row.original.seoImage}
        width={100}
        height={100}
        alt={row.original.name}
        className="size-12 rounded-xl object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "slug",
    header: "Link",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <>{`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} (${weekdays[date.getDay()]}) `}</>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Action row={row} />;
    },
  },
];

const Action = ({ row }: { row: any }) => {
  const { setProductModal, setProductValues, setDeleteModal, setDeleteAction } =
    useModal();

  const onDelete = async () => {
    const result = await deleteProduct(row.original.id);
    if (result.error) {
      toast.error("Can't delete your product", {
        description: "An unexpected error occurred",
      });
    } else {
      toast.success("Your tag has been deleted successfully!");
    }
  };

  const onConfirm = () => {
    setDeleteAction(() => onDelete);
    setDeleteModal(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.moreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          View
          <DropdownMenuShortcut>
            <Icons.eye size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setProductValues({
              categories: row.original.allCategories,
              product: row.original,
            });
            setProductModal(true);
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Icons.edit size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={onConfirm}>
          Delete
          <DropdownMenuShortcut>
            <Icons.delete size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
