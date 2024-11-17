import { fetchCompanies } from "@/lib/companies";
import CompanyCard from "@/components/CompanyCard";
import { Pagination } from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export async function Companies({ page }: { page: number }) {
  const { companies, total } = await fetchCompanies({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No companies found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
