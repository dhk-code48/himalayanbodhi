import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { NewsBillboard, NewsCategory } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import NewsCategoryForm from "@/components/forms/NewsCategoryForm";
import { Icons } from "@/components/shared/Icons";

function NewsCategoryModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues: { category?: NewsCategory; billboards: NewsBillboard[] };
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
          <Icons.newsCategory className="size-10" />
          <h3 className="font-display text-2xl font-bold">News Billboards</h3>
          <p className="text-sm text-gray-500">
            Create and update billboards for news
          </p>
        </div>

        <NewsCategoryForm
          billboards={initialValues.billboards}
          initialValues={initialValues.category}
        />
      </div>
    </Modal>
  );
}

export function useNewsCategoryModal() {
  const [open, setOpen] = useState(false);

  const NewsCategoryModalCallback = useCallback(
    ({
      initialValues,
    }: {
      initialValues: { category?: NewsCategory; billboards: NewsBillboard[] };
    }) => {
      return (
        <NewsCategoryModal
          open={open}
          setOpen={setOpen}
          initialValues={initialValues}
        />
      );
    },
    [open, setOpen],
  );

  return useMemo(
    () => ({
      setNewsCategoryModal: setOpen,
      NewsCategoryModal: NewsCategoryModalCallback,
    }),
    [setOpen, NewsCategoryModalCallback],
  );
}
