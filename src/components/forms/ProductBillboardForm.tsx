"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import upsertProductBillboard from "@/actions/products/upsertProductBillboard";
import { ProductBillboardFormValues, ProductBillboardSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductBillboard } from "@prisma/client";
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
import ImageUpload from "./ImageUpload";

interface ProductBillboardFormProps {
  initialValues?: ProductBillboard;
}

export const ProductBillboardForm: React.FC<ProductBillboardFormProps> = ({
  initialValues,
}) => {
  const router = useRouter();
  const { setProductBillboardModal } = useModal();

  const [isPending, startTransition] = useTransition();

  const toastLoading = initialValues
    ? "Updating News Billboard..."
    : "Creating new News Billboard...";
  const toastMessage = initialValues
    ? "News Billboard updated successfully."
    : "News Billboard created successfully.";
  const action = initialValues ? "Save changes" : "Create";

  const form = useForm<ProductBillboardFormValues>({
    resolver: zodResolver(ProductBillboardSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: ProductBillboardFormValues) => {
    startTransition(async () => {
      toast.promise(upsertProductBillboard(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          setProductBillboardModal(false);
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
