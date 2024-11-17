import { Skeleton } from "@/components/ui/skeleton";

export function PaginationSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="p-4 space-y-3 border rounded-lg">
          <Skeleton className="h-5 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
