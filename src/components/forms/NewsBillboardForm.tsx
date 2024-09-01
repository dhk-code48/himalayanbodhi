"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import upsertNewsBillboard from "@/actions/news/upsertNewsBillboard";
import { NewsBillboardFormValues, NewsBillboardSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsBillboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Icons } from "../shared/Icons";
import { Modal } from "../ui/modal";
import ImageUpload from "./ImageUpload";

interface NewsBillboardFormProps {
  initialValues?: NewsBillboard;
  trigger?: React.ReactNode;
}

export const NewsBillboardForm: React.FC<NewsBillboardFormProps> = ({
  initialValues,
  trigger = (
    <Button>
      Add New <Icons.media size={20} />
    </Button>
  ),
}) => {
  const router = useRouter();
  const { setNewsBillboardModal } = useModal();

  const [isPending, startTransition] = useTransition();

  const toastLoading = initialValues
    ? "Updating News Billboard..."
    : "Creating new News Billboard...";
  const toastMessage = initialValues
    ? "News Billboard updated successfully."
    : "News Billboard created successfully.";
  const action = initialValues ? "Save changes" : "Create";

  const form = useForm<NewsBillboardFormValues>({
    resolver: zodResolver(NewsBillboardSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: NewsBillboardFormValues) => {
    startTransition(async () => {
      toast.promise(upsertNewsBillboard(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          setNewsBillboardModal(false);
          router.refresh();
          return toastMessage;
        },
        error: "Unexpected error happened, Please try again!!",
      });
    });
  };

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Billboard Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Billboard description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="w-full" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    )
  );
};
