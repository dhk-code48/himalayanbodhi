import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icons } from "@/components/shared/Icons";

function DeleteModal({
  open,
  setOpen,
  action,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  action: (() => Promise<void>) | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const onSubmit = () => {
    if (inputValue === "confirm delete" && action) {
      startTransition(async () => {
        await action();
        setOpen(false);
        router.refresh();
      });
    } else {
      toast.error("You must type 'confirm delete' to proceed.");
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen} className="h-fit overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <Icons.danger size={80} className="text-destructive" />
        <h3 className="text-lg font-semibold">Confirm Delete</h3>
        <p className="text-center text-sm text-muted-foreground">
          <b>Warning:</b> This will permanently delete your data
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col space-y-3 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div className="mb-3">
          <label
            htmlFor="verification"
            className="flex items-center gap-x-1 text-sm"
          >
            To verify, type
            <span className="font-semibold text-black dark:text-white">
              confirm delete
            </span>
            below
          </label>
          <Input
            type="text"
            name="verification"
            id="verification"
            pattern="confirm delete"
            required
            autoFocus={false}
            disabled={isPending}
            autoComplete="off"
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-1 w-full border bg-background"
          />
        </div>
        <Button variant="destructive" isPending={isPending}>
          Confirm Delete
        </Button>
        <Button
          type="button"
          onClick={() => setOpen(false)}
          variant="secondary"
          isPending={isPending}
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
}

export function useDeleteModal() {
  const [showDeleteModal, setOpen] = useState(false);

  const DeleteModalCallback = useCallback(
    ({ action }: { action: (() => Promise<void>) | undefined }) => {
      return (
        <DeleteModal open={showDeleteModal} setOpen={setOpen} action={action} />
      );
    },
    [showDeleteModal, setOpen],
  );

  return useMemo(
    () => ({
      setDeleteModal: setOpen,
      DeleteModal: DeleteModalCallback,
    }),
    [setOpen, DeleteModalCallback],
  );
}
