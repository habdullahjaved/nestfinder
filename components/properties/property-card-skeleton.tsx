import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-40" />
        <div className="flex gap-4 border-t border-sand-100 pt-3">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
