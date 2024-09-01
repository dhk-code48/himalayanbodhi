"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import upsertProductCategory from "@/actions/products/upsertProductCategory";
import { ProductCategoryFormValues, ProductCategorySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductBillboard, ProductCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { generateSlug } from "@/lib/utils";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUpload from "./ImageUpload";

interface ProductCategoryFormProps {
  initialValues?: ProductCategory;
  billboards: ProductBillboard[];
}

const ProductCategoryForm: React.FC<ProductCategoryFormProps> = ({
  initialValues,
  billboards,
}) => {
  const router = useRouter();
  const { setProductCategoryModal } = useModal();

  const [isPending, startTransition] = useTransition();

  const toastLoading = initialValues
    ? "Updating Product Category..."
    : "Creating new Product Category...";
  const toastMessage = initialValues
    ? "Product Category updated successfully."
    : "Product Category created successfully.";
  const action = initialValues ? "Save changes" : "Create";

  const form = useForm<ProductCategoryFormValues>({
    resolver: zodResolver(ProductCategorySchema),
    defaultValues: initialValues || {
      name: "",
      slug: "",
      billboardId: 0.5,
      seoImage: "",
    },
  });

  const onSubmit = (data: ProductCategoryFormValues) => {
    startTransition(async () => {
      toast.promise(upsertProductCategory(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          setProductCategoryModal(false);
          router.refresh();
          return toastMessage;
        },
        error: "Unexpected error happened, Please try again!!",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category Name</FormLabel>
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
                    <SelectValue placeholder="Select Billboard" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {billboards ? (
                    billboards.map((billboard, index) => (
                      <SelectItem
                        key={"billboard-" + index}
                        value={billboard.id.toString()}
                      >
                        {billboard.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="0.5">
                      No Item Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
};
export default ProductCategoryForm;
