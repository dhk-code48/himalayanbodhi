"use client";

import deleteNewsCategory from "@/actions/news/deleteNewsCategory";
import { weekdays } from "@/config";
import { NewsBillboard, NewsCategory } from "@prisma/client";
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
import NewsCategoryForm from "@/components/forms/NewsCategoryForm";
import { Icons } from "@/components/shared/Icons";

export const columns: ColumnDef<
  NewsCategory & { allBillboards: NewsBillboard[] }
>[] = [
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) => (
      <CldImage
        src={row.original.banner}
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
  const {
    setNewsCategoryModal,
    setNewsCategoryValues,
    setDeleteAction,
    setDeleteModal,
  } = useModal();

  const onDelete = async () => {
    const result = await deleteNewsCategory(row.original.id);
    if (result.error) {
      toast.error("Can't delete your news category", {
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
            setNewsCategoryValues({
              billboards: row.original.allBillboards,
              category: row.original,
            });
            setNewsCategoryModal(true);
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
