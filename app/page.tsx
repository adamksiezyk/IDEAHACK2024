import { Suspense } from "react";
import { PaginationSkeleton } from "@/components/Skeleton";
import HERGraph from "@/components/graph";
import { CompaniesList } from "@/components/CompaniesList";
import Navbar from "@/components/Navbar";

export default async function CompaniesBoard() {
  return (
    <>
      <Navbar />
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
    </>
  );
}
