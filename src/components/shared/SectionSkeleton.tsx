import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSection({ card = false }: { card?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-4 py-8 md:grid-cols-10">
      <div className="col-span-4 space-y-1.5">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <div className="col-span-6">
        {card ? (
          <Skeleton className="h-44 w-full rounded-xl" />
        ) : (
          <>
            <div className="mb-1.5 flex gap-x-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-[67px] shrink-0 sm:w-[130px]" />
            </div>
            <Skeleton className="size-56" />
          </>
        )}
      </div>
    </div>
  );
}

export function ProductsSkeleton({ cards = 5 }: { cards?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {Array.from({ length: cards }).map((_, i) => (
        <Skeleton
          className="h-[250px] w-[200px]"
          key={"skeleton-product-" + i}
        />
      ))}
    </div>
  );
}
