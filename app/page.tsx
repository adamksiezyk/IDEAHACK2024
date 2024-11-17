import { Suspense } from "react";
import { PaginationSkeleton } from "@/components/Skeleton";
import HERGraph from "@/components/graph";
import { CompaniesList } from "@/components/CompaniesList";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

const isDevelopment = process.env.NODE_ENV === "development";

export default async function CompaniesBoard() {
  const session = isDevelopment
    ? ({
        user: {
          name: "Developer",
          email: "U1Gk8@example.com",
          image: null,
        },
        expires: "",
      } as Session)
    : await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <Navbar userName={session.user ? session.user.name : null} />
      <div className="flex min-h-screen">
        <div className="flex-1 p-4">
          <Suspense fallback={<PaginationSkeleton />}>
            <CompaniesList />
          </Suspense>
        </div>
        <div className="mt-4 graph-container">
          <HERGraph />
        </div>
      </div>
    </main>
  );
}
