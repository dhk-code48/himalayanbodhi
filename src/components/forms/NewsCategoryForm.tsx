"use client";

import React, { FC, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import upsertCategory from "@/actions/news/upsertNewsCategory";
import upsertNewsCategory from "@/actions/news/upsertNewsCategory";
import { NewsCategoryFormValues, NewsCategorySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsBillboard, NewsCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { generateSlug } from "@/lib/utils";
import { useModal } from "@/provider/ModalProvider";

import { Icons } from "../shared/Icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import ImageUpload from "./ImageUpload";

interface NewsCategoryFormProps {
  initialValues?: NewsCategory | null;
  billboards: NewsBillboard[];
}

const NewsCategoryForm: FC<NewsCategoryFormProps> = ({
  billboards,
  initialValues,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setNewsCategoryModal } = useModal();

  const toastLoading = initialValues
    ? "Updating News Category..."
    : "Creating new News Category...";
  const toastMessage = initialValues
    ? "Your news category has been updated!!"
    : "Congratulation, new News Category has been created!!";
  const action = initialValues ? "Updated Category" : "Create Category";

  const form = useForm<NewsCategoryFormValues>({
    resolver: zodResolver(NewsCategorySchema),
    defaultValues: initialValues || {
      billboardId: 0.5,
      name: "",
    },
  });

  const onSubmit = async (data: NewsCategoryFormValues) => {
    startTransition(async () => {
      toast.promise(upsertNewsCategory(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          router.refresh();
          setNewsCategoryModal(false);
          return toastMessage;
        },
        error: "Unexpected Error Ocurred, Please try again!!",
      });
    });
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name && !initialValues) {
        const generatedSlug = generateSlug(value.name);
        form.setValue("slug", generatedSlug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, initialValues]);

  const [ogImageSameAsBanner, setOgImageSameAsBanner] =
    useState<boolean>(false);
  useEffect(() => {
    if (ogImageSameAsBanner && form.getValues("banner")) {
      form.setValue("seoImage", form.getValues("banner"), {
        shouldValidate: true,
      });
    }
    if (!ogImageSameAsBanner) {
      form.setValue("seoImage", "");
    }
  }, [form, ogImageSameAsBanner]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>
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
            name="seoImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Image</FormLabel>
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
        </div>
        <div className="flex w-full items-center justify-between rounded-lg border p-4">
          <p>Make SEO Image same as Banner</p>
          <Switch
            checked={ogImageSameAsBanner}
            onCheckedChange={setOgImageSameAsBanner}
            disabled={!form.getValues("banner")}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>News Category Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Category name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billboardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard</FormLabel>

              <Select
                onValueChange={(e) => field.onChange(parseInt(e))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billboard" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {billboards.map((billboard, index) => (
                    <SelectItem
                      key={"billboard-" + index}
                      value={billboard.id.toString()}
                    >
                      {billboard.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{action}</Button>
      </form>
    </Form>
  );
};

export default NewsCategoryForm;
