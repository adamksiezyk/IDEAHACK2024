import { Suspense } from "react";
import { Companies } from "@/components/Companies";
import { PaginationSkeleton } from "@/components/Skeleton";
import { Pagination } from "@/components/Pagination";
import HERGraph from "@/components/graph";
import { CompaniesList } from "@/components/CompaniesList";

export default async function CompaniesBoard() {
  return (
    <div className="flex p-4 min-h-screen">
      <div className="flex-1">
        <Suspense fallback={<PaginationSkeleton />}>
          <CompaniesList />
        </Suspense>
      </div>
      <div className="w-[600px]">
        <HERGraph />
      </div>
    </div>
  );
}
