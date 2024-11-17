import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import Graph from "@/components/graph";
import { Company, fetchCompanies } from "@/lib/companies";
import CompanyCard from "@/components/CompanyCard";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default async function CompaniesBoard() {
  // Sample data matching the screenshot
  const companies: Company[] = await fetchCompanies();

  return (
    <main>

    <div className="flex">
      <div className="flex p-4 flex-col gap-4 min-w-[800px]">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      <div className="graph-container mt-4">
        <Graph />
      </div>
    </div></main>
  );
}
