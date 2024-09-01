"use client";

import React from "react";
import Link from "next/link";
import { marketingConfig } from "@/config/marketing";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

import { Icons } from "../shared/Icons";
import Logo from "./Logo";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-50 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
      }`}
    >
      <MaxWidthWrapper className="flex h-14 items-center justify-between gap-6 py-4 md:gap-10">
        <Link href="/" className="flex items-center space-x-1.5">
          <Logo />
        </Link>

        <NavigationMenu className="hidden gap-6 md:flex">
          <NavigationMenuList>
            {marketingConfig.mainNav.map((item, index) => (
              <Link
                key={"navbar-item-" + index}
                href={item.disabled ? "#" : item.href}
                prefetch={true}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </MaxWidthWrapper>
    </header>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md bg-transparent p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListName";
