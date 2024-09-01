import * as z from "zod";

export const NewsSchema = z.object({
  slug: z.string().min(1, {
    message: "Slug must not be empty",
  }),
  title: z.string().min(1, {
    message: "Title must not be empty",
  }),
  description: z.string().min(1, {
    message: "Description must not be empty",
  }),
  content: z.string().min(1, {
    message: "Content must not be empty",
  }),
  banner: z.string().min(1, {
    message: "Banner image is needed",
  }),
  seoImage: z.string().min(1, {
    message: "SEO image is needed",
  }),
  categoryId: z.number().min(1, {
    message: "News category is needed",
  }),
});

export type NewsFormValues = z.infer<typeof NewsSchema>;

export const NewsCategorySchema = z.object({
  slug: z.string().min(1, {
    message: "Slug must not be empty",
  }),
  name: z.string().min(1, {
    message: "Title must not be empty",
  }),
  banner: z.string().min(1, {
    message: "Banner is required",
  }),
  seoImage: z.string().min(1, {
    message: "SEO Image is required",
  }),
  billboardId: z.number().min(1, {
    message: "Billboard Image is required",
  }),
});
export type NewsCategoryFormValues = z.infer<typeof NewsCategorySchema>;

export const NewsBillboardSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
});

export type NewsBillboardFormValues = z.infer<typeof NewsBillboardSchema>;

// ---- ---- PRODUCTS ---- ---- //

export const ProductSchema = z.object({
  slug: z.string().min(1, {
    message: "Slug must not be empty",
  }),
  name: z.string().min(1, {
    message: "Title must not be empty",
  }),
  description: z.string().min(1, {
    message: "Description must not be empty",
  }),
  content: z.string().min(1, {
    message: "Content must not be empty",
  }),
  images: z.object({ url: z.string() }).array(),
  seoImage: z.string().min(1, {
    message: "SEO image is needed",
  }),
  categoryId: z.number().min(1, {
    message: "Product category is needed",
  }),
  subCategoryId: z.number().min(1, {
    message: "Product sub category is needed",
  }),
});
export type ProductFormValues = z.infer<typeof ProductSchema>;

export const ProductCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Title must not be empty",
  }),
  slug: z.string().min(1, {
    message: "Slug must not be empty",
  }),
  seoImage: z.string().min(1, {
    message: "SEO Image is required",
  }),
  billboardId: z.number().min(1, {
    message: "Billboard Image is required",
  }),
});
export type ProductCategoryFormValues = z.infer<typeof ProductCategorySchema>;

export const ProductSubCategorySchema = z.object({
  slug: z.string().min(1, {
    message: "Slug must not be empty",
  }),
  name: z.string().min(1, {
    message: "Title must not be empty",
  }),
  categoryId: z.number().min(1, {
    message: "Product category is needed",
  }),
});
export type ProductSubCategoryFormValues = z.infer<
  typeof ProductSubCategorySchema
>;

export const ProductBillboardSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
});

export type ProductBillboardFormValues = z.infer<typeof ProductBillboardSchema>;
