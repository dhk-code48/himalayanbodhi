import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { NewsBillboard } from "@prisma/client";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { NewsBillboardForm } from "@/components/forms/NewsBillboardForm";
import { Icons } from "@/components/shared/Icons";

function NewsBillboardModal({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  initialValues?: NewsBillboard;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-1 border-b bg-accent px-4 py-6 pt-8 text-center md:px-16">
          <Icons.media className="size-10" />
          <h3 className="font-display text-2xl font-bold">News Billboards</h3>
          <p className="text-sm text-gray-500">
            Create and update billboards for news
          </p>
        </div>

        <NewsBillboardForm initialValues={initialValues} />
      </div>
    </Modal>
  );
}

export function useNewsBillboardModal() {
  const [open, setOpen] = useState(false);

  const NewsBillboardModalCallback = useCallback(
    ({ initialValues }: { initialValues?: NewsBillboard }) => {
      return (
        <NewsBillboardModal
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
      setNewsBillboardModal: setOpen,
      NewsBillboardModal: NewsBillboardModalCallback,
    }),
    [setOpen, NewsBillboardModalCallback],
  );
}
