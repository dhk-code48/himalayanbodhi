"use client";

import deleteNewsBillboard from "@/actions/news/deleteNewsBillboard";
import { weekdays } from "@/config";
import { NewsBillboard } from "@prisma/client";
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
import { NewsBillboardForm } from "@/components/forms/NewsBillboardForm";
import { Icons } from "@/components/shared/Icons";

export const columns: ColumnDef<NewsBillboard>[] = [
  {
    accessorKey: "imageUrl",
    header: "Banner",
    cell: ({ row }) => (
      <CldImage
        src={row.original.imageUrl}
        width={100}
        height={100}
        alt={row.original.title}
        className="size-12 rounded-xl object-cover"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
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
    setNewsBillboardModal,
    setNewsBillboardValues,
    setDeleteAction,
    setDeleteModal,
  } = useModal();

  const onDelete = async () => {
    const result = await deleteNewsBillboard(row.original.id);
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
            setNewsBillboardValues(row.original);
            setNewsBillboardModal(true);
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
