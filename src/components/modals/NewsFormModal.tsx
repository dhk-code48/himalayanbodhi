import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { News, NewsCategory } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import NewsForm from "@/components/forms/NewsForm";
import { Icons } from "@/components/shared/Icons";

function NewsModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues: { news?: News; categories: NewsCategory[] };
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="w-full max-w-screen-xl"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
        <Icons.news className="size-10" />
        <h3 className="font-display text-2xl font-bold">News</h3>
        <p className="text-sm text-gray-500">Create and update news</p>
      </div>

      <NewsForm
        categories={initialValues.categories}
        initialValues={initialValues.news}
      />
    </Modal>
  );
}

export function useNewsModal() {
  const [open, setOpen] = useState(false);

  const NewsModalCallback = useCallback(
    ({
      initialValues,
    }: {
      initialValues: { category?: News; categories: NewsCategory[] };
    }) => {
      return (
        <NewsModal
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
      setNewsModal: setOpen,
      NewsModal: NewsModalCallback,
    }),
    [setOpen, NewsModalCallback],
  );
}
