"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import upsertNews from "@/actions/news/upsertNews";
import { NewsFormValues, NewsSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { News, NewsCategory } from "@prisma/client";
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

interface NewsFormProps {
  initialValues?: News;
  categories: NewsCategory[];
}

const NewsForm: React.FC<NewsFormProps> = ({ initialValues, categories }) => {
  const router = useRouter();
  const { setNewsModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const toastLoading = initialValues
    ? "Updating News Billboard..."
    : "Creating new News Billboard...";
  const toastMessage = initialValues
    ? "News Billboard updated successfully."
    : "News Billboard created successfully.";
  const action = initialValues ? "Save changes" : "Create";

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(NewsSchema),
    defaultValues: initialValues || {
      title: "",
      banner: "",
      content: "",
      description: "",
      seoImage: "",
      categoryId: 0.5,
    },
  });

  const onSubmit = (data: NewsFormValues) => {
    startTransition(async () => {
      toast.promise(upsertNews(data, initialValues?.id), {
        loading: toastLoading,
        success: () => {
          setNewsModal(false);
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

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title" && value.title && !initialValues) {
        const generatedSlug = generateSlug(value.title);
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
    isMounted && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="News Title"
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
                    placeholder="News url"
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
                    placeholder="News description"
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
                <FormLabel>News Content</FormLabel>
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
                    {categories.map((categories, index) => (
                      <SelectItem
                        key={"category-" + index}
                        value={categories.id.toString()}
                      >
                        {categories.name}
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
    )
  );
};

export default NewsForm;
