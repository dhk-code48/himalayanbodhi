"use client";

import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { Icons } from "../shared/Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface FilterOptionProps extends React.HTMLAttributes<HTMLDivElement> {}
const FilterOption: FC<FilterOptionProps> = ({ className, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="my-10 space-y-2 lg:my-0 lg:space-y-5">
        <div className="hidden w-full max-w-96 items-stretch lg:flex">
          <Input
            placeholder="Search by product name ...."
            className="h-10 rounded-l-lg rounded-r-none border-r-0 bg-background text-foreground"
          />
          <Button
            className="h-10 rounded-l-none rounded-r-lg border border-l-0 border-input px-2 text-muted-foreground"
            variant="ghost"
          >
            <Icons.search size={20} />
          </Button>
        </div>

        <p className="text-sm font-semibold text-muted-foreground">Sort By</p>
        <div className="flex items-center gap-x-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Relevance</SelectLabel>
                <SelectItem value="relevance-popular">Popular</SelectItem>
                <SelectItem value="relevance-recommended">
                  Recommended
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="my-10 space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Categories
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort By Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="relevance-popular">Popular</SelectItem>
              <SelectItem value="relevance-recommended">Recommended</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="my-10 space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">
          Sub Categories
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort By Sub Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>SubCategories</SelectLabel>
              <SelectItem value="relevance-popular">Popular</SelectItem>
              <SelectItem value="relevance-recommended">Recommended</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

interface MobileFilterProps extends HTMLAttributes<HTMLDivElement> {}
const MobileFilter: FC<MobileFilterProps> = ({ className, ...props }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="block lg:hidden">
        <Button variant="secondary">
          <Icons.filter size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-[70]">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <FilterOption />
        <SheetFooter>
          <div className="flex items-center justify-between gap-x-3">
            <Button variant="secondary" className="flex-1">
              Reset Filter
            </Button>
            <Button className="flex-1">Search</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { MobileFilter, FilterOption };
