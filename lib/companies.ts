export interface Company {
  id: string;
  logo: string;
  name: string;
  industry: string;
  size: string;
  stage: string;
  founded: number;
  location: string;
  currentChallenge: Challenge;
  previousCollaborations: string[];
  rdBudget: string;
  preferredCollaborationType: string[];
  areas: string[];
}

export interface Challenge {
  id: string;
  area: string;
  description: string;
  urgency: string;
  budget: string;
  timeline: string;
  requiredExpertise: string[];
}

export async function fetchCompanies(): Promise<Company[]> {
  return Promise.resolve([
    {
      id: "b1",
      logo: "green_tech_logo.png",
      name: "GreenTech Solutions",
      industry: "Renewable Energy",
      size: "Mid-size (250 employees)",
      stage: "Scale-up",
      founded: 2018,
      location: "Copenhagen, Denmark",
      currentChallenge: {
        id: "ch1",
        area: "Energy Storage",
        description: "Need to improve battery efficiency by 30%",
        urgency: "High",
        budget: "$2M",
        timeline: "18 months",
        requiredExpertise: [
          "Battery Technology",
          "Materials Science",
          "Electrical Engineering",
        ],
      },
      previousCollaborations: ["Technical University of Denmark", "Siemens"],
      rdBudget: "$5M annually",
      preferredCollaborationType: ["Joint Research", "Technology Licensing"],
      areas: ["Energy Storage", "Smart Grid", "Sustainability"],
    },
    {
      id: "b2",
      logo: "healthai_logo.png",
      name: "HealthAI Systems",
      industry: "Healthcare Technology",
      size: "Startup (50 employees)",
      stage: "Series B",
      founded: 2020,
      location: "Boston, MA",
      currentChallenge: {
        id: "ch3",
        area: "Medical Imaging",
        description: "Improve diagnostic accuracy using AI",
        urgency: "High",
        budget: "$1.5M",
        timeline: "12 months",
        requiredExpertise: [
          "Computer Vision",
          "Medical Imaging",
          "Deep Learning",
        ],
      },
      previousCollaborations: [
        "Massachusetts General Hospital",
        "IBM Research",
      ],
      rdBudget: "$3M annually",
      preferredCollaborationType: ["Research Partnership", "IP Acquisition"],
      areas: ["AI in Healthcare", "Medical Diagnostics"],
    },
  ]);
}
