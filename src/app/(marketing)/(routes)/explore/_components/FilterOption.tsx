import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/shared/Icons";

interface MobileFilterProps extends HTMLAttributes<HTMLDivElement> {}
const MobileFilter: FC<MobileFilterProps> = ({ className, ...props }) => {
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
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <SelectItem value="price-dsc">Price High To Low</SelectItem>
                <SelectItem value="price-asc">Price Low To High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="my-10 space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">Price</p>
        <div className="flex items-center gap-x-3">
          <Input placeholder="Min" className="flex-1" />
          <p>-</p>
          <Input placeholder="Max" className="flex-1" />
          <Button size="icon">
            <Icons.chevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
