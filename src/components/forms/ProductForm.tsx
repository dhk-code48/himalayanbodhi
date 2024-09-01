"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import upsertProduct from "@/actions/products/upsertProduct";
import { ProductFormValues, ProductSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductCategory, ProductSubCategory } from "@prisma/client";
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

import { MinimalTiptapEditor } from "../editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  initialValues?: Product;
  categories: (ProductCategory & { subCategories: ProductSubCategory[] })[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  categories,
}) => {
  const router = useRouter();
  const { setProductModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const toastLoading = initialValues
    ? "Updating Product .."
    : "Creating new Product ..";
  const toastMessage = initialValues
    ? "Product updated successfully."
    : "Product created successfully.";
  const action = initialValues ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialValues || {
      name: "",
      images: [],
      content: "",
      description: "",
      seoImage: "",
      subCategoryId: 0.5,
      categoryId: 0.5,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    startTransition(async () => {
      toast.promise(upsertProduct(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          setProductModal(false);
          router.refresh();
          return toastMessage;
        },
        error: "Unexpected error happened, Please try again!!",
      });
    });
  };

  const [subCategories, setSubCategories] = useState<ProductSubCategory[]>(
    categories.find((i) => i.id === initialValues?.categoryId)?.subCategories ||
      [],
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "categoryId" && value.categoryId && !initialValues) {
        const subCategory: ProductSubCategory[] =
          categories.find((i) => i.id === value.categoryId)?.subCategories ||
          [];
        setSubCategories(subCategory);
      }
    });

    return () => subscription.unsubscribe();
  }, [categories, initialValues, form]);

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-xl space-y-8 p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    multiple
                    value={field.value.map((image) => image.url)}
                    disabled={isPending}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Product Name"
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
                <Input
                  disabled={isPending}
                  placeholder="Product url"
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
                  placeholder="Product description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Content</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  throttleDelay={2000}
                  className="w-full"
                  editorContentClassName="p-5"
                  output="html"
                  placeholder="Type your description here..."
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none"
                />
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
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem
                      key={"category-" + index}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubCategory</FormLabel>

              <Select
                onValueChange={(e) => field.onChange(parseInt(e))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subCategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subCategories.map((subCategory, index) => (
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

export default ProductForm;
