import { Suspense } from "react";
import { PaginationSkeleton } from "@/components/Skeleton";
import HERGraph from "@/components/graph";
import { CompaniesList } from "@/components/CompaniesList";
import Navbar from "@/components/Navbar";
import AppBar from "@mui/material/AppBar";

export default async function CompaniesBoard() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <div className="flex-1 p-4">
          <Suspense fallback={<PaginationSkeleton />}>
            <CompaniesList />
          </Suspense>
        </div>
        <div className="w-[600px]">
          <HERGraph />
        </div>
      </div>
      <Graph />
    </div>
  );
}
