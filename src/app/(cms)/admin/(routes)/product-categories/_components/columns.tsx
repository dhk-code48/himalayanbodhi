"use client";

import deleteProductCategory from "@/actions/products/deleteProductCategory";
import { weekdays } from "@/config";
import { ProductBillboard, ProductCategory } from "@prisma/client";
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
  ProductCategory & { allBillboards: ProductBillboard[] }
>[] = [
  {
    accessorKey: "imageUrl",
    header: "Banner",
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
      <Action row={row} />;
    },
  },
];

const Action = ({ row }: { row: any }) => {
  const {
    setProductCategoryModal,
    setProductCategoryValues,
    setDeleteAction,
    setDeleteModal,
  } = useModal();

  const onDelete = async () => {
    const result = await deleteProductCategory(row.original.id);
    if (result.error) {
      toast.error("Can't delete your product category", {
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
            setProductCategoryValues({
              billboards: row.original.allBillboards,
              category: row.original,
            });
            setProductCategoryModal(true);
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Icons.edit size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="bg-destructive/20 text-destructive"
          onClick={onConfirm}
        >
          Delete
          <DropdownMenuShortcut>
            <Icons.delete size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
