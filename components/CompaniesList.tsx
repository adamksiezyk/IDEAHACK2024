"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CompanyCard from "@/components/CompanyCard";
import { Company, fetchCompanies } from "@/lib/companies";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export function CompaniesList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  // Create ref for intersection observer
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px", // Load more when within 100px of the bottom
  });

  const loadCompanies = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const { companies: newCompanies, total } = await fetchCompanies({
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      });

      setCompanies((prev) => {
        // Remove duplicates in case of race conditions
        const uniqueCompanies = [...prev];
        newCompanies.forEach((company) => {
          if (!uniqueCompanies.find((c) => c.id === company.id)) {
            uniqueCompanies.push(company);
          }
        });
        return uniqueCompanies;
      });

      // Check if we've loaded all companies
      setHasMore(companies.length + newCompanies.length < total);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadCompanies(1);
  }, [loadCompanies]);

  // Load more when scrolling to bottom
  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      pageRef.current += 1;
      loadCompanies(pageRef.current);
    }
  }, [inView, isLoading, hasMore, loadCompanies]);

  if (companies.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No companies found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}

      {/* Loading indicator and intersection observer target */}
      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isLoading && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">
              Loading more companies...
            </span>
          </div>
        )}
      </div>

      {/* End of list message */}
      {!hasMore && companies.length > 0 && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          No more companies to load
        </div>
      )}
    </div>
  );
}
