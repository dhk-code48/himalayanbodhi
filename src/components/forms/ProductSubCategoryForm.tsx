"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import upsertProductSubCategory from "@/actions/products/upsertProductSubCategory";
import {
  ProductSubCategoryFormValues,
  ProductSubCategorySchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCategory, ProductSubCategory } from "@prisma/client";
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

import { Icons } from "../shared/Icons";
import { Modal } from "../ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUpload from "./ImageUpload";

interface ProductSubCategoryFormProps {
  initialValues?: ProductSubCategory;
  productCategories: ProductCategory[];
}

const ProductSubCategoryForm: React.FC<ProductSubCategoryFormProps> = ({
  initialValues,
  productCategories,
}) => {
  const router = useRouter();
  const { setProductSubCategoryModal } = useModal();

  const [isPending, startTransition] = useTransition();

  const toastLoading = initialValues
    ? "Updating Product SubCategory..."
    : "Creating new Product SubCategory...";
  const toastMessage = initialValues
    ? "Product SubCategory updated successfully."
    : "Product SubCategory created successfully.";
  const action = initialValues ? "Save changes" : "Create";

  const form = useForm<ProductSubCategoryFormValues>({
    resolver: zodResolver(ProductSubCategorySchema),
    defaultValues: initialValues || {
      name: "",
      slug: "",
      categoryId: 0.5,
    },
  });

  const onSubmit = (data: ProductSubCategoryFormValues) => {
    startTransition(async () => {
      toast.promise(upsertProductSubCategory(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          setProductSubCategoryModal(false);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product SubCategory Name</FormLabel>
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <Select
                onValueChange={(e) => field.onChange(parseInt(e))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select SubCategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productCategories.map((subCategory, index) => (
                    <SelectItem
                      key={"subCategory-" + index}
                      value={subCategory.id.toString()}
                    >
                      {subCategory.name}
                    </SelectItem>
                  ))}
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
export default ProductSubCategoryForm;
