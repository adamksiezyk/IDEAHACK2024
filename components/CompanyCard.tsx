import { Building2 } from "lucide-react";
import { LocationOn } from "@mui/icons-material";
import { Chip, Avatar, Typography } from "@mui/material";
import { Company } from "@/lib/companies";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors">
      {/* Left section with logo and job details */}
      <div className="flex gap-4">
        {/* Company Logo */}
        {company.logo ? (
          <Avatar
            src={company.logo}
            variant="rounded"
            className="w-12 h-12"
            alt={`${company} logo`}
          />
        ) : (
          <Building2 className="w-12 h-12" />
        )}

        {/* Job Information */}
        <div className="flex flex-col gap-1">
          {/* Title */}
          <Typography variant="h6" className="text-white font-medium">
            {company.currentChallenge.description}
          </Typography>

          {/* Company and Location Row */}
          <div className="flex items-center gap-2">
            {/* Company icon and name */}
            <div className="flex items-center gap-1">
              <span className="text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                </svg>
              </span>
              <Typography className="text-gray-400">{company.name}</Typography>
            </div>

            {/* Location with dropdown */}
            <div className="flex items-center">
              <Chip
                icon={<LocationOn className="!text-gray-400" />}
                label={
                  <span className="flex items-center gap-1">
                    {company.location}
                  </span>
                }
                variant="outlined"
                className="!bg-transparent !border-zinc-700 !text-gray-400"
              />
            </div>

            {/* Remote tag */}
            <div className="flex items-center gap-1">
              <span className="text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z" />
                </svg>
              </span>
              <Typography className="text-gray-400">Fully remote</Typography>
            </div>
          </div>

          {/* Skills */}
          <div className="flex gap-2 mt-1">
            {company.areas.map((area) => (
              <Chip
                key={area}
                label={area}
                className="!bg-zinc-800 !text-gray-300"
                size="small"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right section with salary and new tag */}
      <div className="flex flex-col items-end gap-1">
        <Typography className="text-emerald-400 font-medium">
          {company.rdBudget}
        </Typography>
        <Chip
          label={company.stage}
          size="small"
          className="!bg-zinc-800 !text-gray-300"
        />
      </div>
    </div>
  );
}
