import { Suspense } from "react";
import { Companies } from "@/components/Companies";
import { PaginationSkeleton } from "@/components/Skeleton";
import { Pagination } from "@/components/Pagination";
import HERGraph from "@/components/graph";

export default async function CompaniesBoard({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;

  return (
    <div className="flex p-4 min-h-screen">
      <div className="flex-1">
        <Suspense fallback={<PaginationSkeleton />}>
          <Companies page={page} />
        </Suspense>
      </div>
      <div className="w-[600px]">
        <HERGraph />
      </div>
    </div>
  );
}
