import { SidebarNavItem } from "@/types";
import { UserRole } from "@prisma/client";

export const sidebarLinks: SidebarNavItem[] = [
  // {
  //   title: "Dashboard",
  //   items: [
  //     { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
  //     {
  //       href: "/cms",
  //       icon: "chart",
  //       title: "Analytics",
  //       authorizeOnly: UserRole.ADMIN,
  //     },
  //   ],
  // },
  {
    title: "Commerce",
    items: [
      { href: "/admin/news", icon: "news", title: "News" },
      {
        href: "/admin/news-categories",
        icon: "newsCategory",
        title: "News Categories",
      },
      {
        href: "/admin/news-billboards",
        icon: "media",
        title: "News Billboards",
      },
      { href: "/admin/products", icon: "product", title: "Products" },
      {
        href: "/admin/product-categories",
        icon: "productCategory",
        title: "Products Categories",
      },
      {
        href: "/admin/product-subcategories",
        icon: "productSubCategory",
        title: "Products Sub Categories",
      },
      {
        href: "/admin/product-billboards",
        icon: "media",
        title: "Product Billboards",
      },
    ],
  },
];
