export interface Company {
  id: string;
  logo?: string;
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

export const COMPANIES = [
  {
    id: "b1",
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
    name: "AquaInnovators",
    industry: "Water Technology",
    size: "Small (100 employees)",
    stage: "Start-up",
    founded: 2020,
    location: "Amsterdam, Netherlands",
    currentChallenge: {
      id: "ch2",
      area: "Desalination",
      description: "Reduce energy consumption in desalination by 40%",
      urgency: "Medium",
      budget: "$1.5M",
      timeline: "24 months",
      requiredExpertise: [
        "Membrane Technology",
        "Chemical Engineering",
        "Process Optimization",
      ],
    },
    previousCollaborations: ["TU Delft", "Royal HaskoningDHV"],
    rdBudget: "$3M annually",
    preferredCollaborationType: ["Joint Venture", "Contract Research"],
    areas: ["Desalination", "Water Recycling", "Clean Water Access"],
  },
  {
    id: "b3",
    name: "AgriTech Dynamics",
    industry: "Agricultural Technology",
    size: "Large (1,000 employees)",
    stage: "Established",
    founded: 2010,
    location: "Sacramento, USA",
    currentChallenge: {
      id: "ch3",
      area: "Precision Farming",
      description: "Enhance crop yield prediction accuracy by 20%",
      urgency: "High",
      budget: "$3M",
      timeline: "12 months",
      requiredExpertise: ["Machine Learning", "Remote Sensing", "Agronomy"],
    },
    previousCollaborations: ["UC Davis", "John Deere"],
    rdBudget: "$10M annually",
    preferredCollaborationType: [
      "Public-Private Partnership",
      "Licensing Agreements",
    ],
    areas: ["Precision Farming", "Crop Monitoring", "Agro-Analytics"],
  },
  {
    id: "b4",
    name: "EcoBuild Systems",
    industry: "Green Construction",
    size: "Mid-size (300 employees)",
    stage: "Scale-up",
    founded: 2015,
    location: "Munich, Germany",
    currentChallenge: {
      id: "ch4",
      area: "Sustainable Materials",
      description: "Develop carbon-negative construction materials",
      urgency: "High",
      budget: "$2.5M",
      timeline: "30 months",
      requiredExpertise: [
        "Materials Science",
        "Civil Engineering",
        "Environmental Chemistry",
      ],
    },
    previousCollaborations: ["TU Munich", "BASF"],
    rdBudget: "$4M annually",
    preferredCollaborationType: ["Joint Research", "Co-Development"],
    areas: [
      "Sustainable Materials",
      "Energy-Efficient Design",
      "Circular Economy",
    ],
  },
  {
    id: "b5",
    name: "BioHealth Analytics",
    industry: "Biotechnology",
    size: "Mid-size (400 employees)",
    stage: "Established",
    founded: 2012,
    location: "Toronto, Canada",
    currentChallenge: {
      id: "ch5",
      area: "Personalized Medicine",
      description: "Integrate AI to personalize treatment plans",
      urgency: "Medium",
      budget: "$3.5M",
      timeline: "24 months",
      requiredExpertise: ["Bioinformatics", "AI/ML", "Pharmacology"],
    },
    previousCollaborations: ["University of Toronto", "Roche"],
    rdBudget: "$8M annually",
    preferredCollaborationType: ["Joint Research", "Clinical Trials"],
    areas: ["Personalized Medicine", "Genomics", "Health Data Analytics"],
  },
  {
    id: "b6",
    name: "Urban Mobility Solutions",
    industry: "Transportation",
    size: "Large (1,200 employees)",
    stage: "Established",
    founded: 2005,
    location: "Oslo, Norway",
    currentChallenge: {
      id: "ch6",
      area: "EV Infrastructure",
      description: "Expand EV charging networks by 50% in rural areas",
      urgency: "High",
      budget: "$6M",
      timeline: "18 months",
      requiredExpertise: [
        "Electrical Engineering",
        "Urban Planning",
        "Sustainability",
      ],
    },
    previousCollaborations: ["Statkraft", "ABB"],
    rdBudget: "$15M annually",
    preferredCollaborationType: [
      "Public-Private Partnership",
      "Co-Development",
    ],
    areas: ["EV Infrastructure", "Sustainable Transport", "Smart Mobility"],
  },
  {
    id: "b7",
    name: "NeuroTech Innovators",
    industry: "Healthcare Technology",
    size: "Small (150 employees)",
    stage: "Start-up",
    founded: 2021,
    location: "Austin, USA",
    currentChallenge: {
      id: "ch7",
      area: "Brain-Computer Interface",
      description: "Develop non-invasive BCIs for medical use",
      urgency: "Medium",
      budget: "$2M",
      timeline: "24 months",
      requiredExpertise: [
        "Neuroscience",
        "Software Development",
        "Biomedical Engineering",
      ],
    },
    previousCollaborations: ["UT Austin", "Dell Medical School"],
    rdBudget: "$2.5M annually",
    preferredCollaborationType: ["Joint Research", "Pilot Programs"],
    areas: [
      "Brain-Computer Interface",
      "Neurorehabilitation",
      "AI in Healthcare",
    ],
  },
  {
    id: "b8",
    name: "CleanAir Technologies",
    industry: "Environmental Science",
    size: "Mid-size (350 employees)",
    stage: "Scale-up",
    founded: 2016,
    location: "Melbourne, Australia",
    currentChallenge: {
      id: "ch8",
      area: "Air Purification",
      description: "Create low-cost air purifiers for urban households",
      urgency: "High",
      budget: "$1.2M",
      timeline: "12 months",
      requiredExpertise: [
        "Mechanical Engineering",
        "Product Design",
        "Environmental Science",
      ],
    },
    previousCollaborations: ["Monash University", "CSIRO"],
    rdBudget: "$3M annually",
    preferredCollaborationType: [
      "Product Co-Development",
      "Licensing Agreements",
    ],
    areas: ["Air Purification", "Emission Control", "Indoor Air Quality"],
  },
  {
    id: "b9",
    name: "SolarWave Inc.",
    industry: "Renewable Energy",
    size: "Large (1,500 employees)",
    stage: "Established",
    founded: 2008,
    location: "San Diego, USA",
    currentChallenge: {
      id: "ch9",
      area: "Solar Efficiency",
      description: "Increase solar panel efficiency to 25%",
      urgency: "High",
      budget: "$5M",
      timeline: "36 months",
      requiredExpertise: ["Solar Technology", "Physics", "Nanotechnology"],
    },
    previousCollaborations: ["UC San Diego", "First Solar"],
    rdBudget: "$20M annually",
    preferredCollaborationType: ["Joint Research", "Technology Licensing"],
    areas: ["Solar Efficiency", "Grid Integration", "Energy Storage"],
  },
  {
    id: "b10",
    name: "DeepSea Robotics",
    industry: "Marine Technology",
    size: "Mid-size (200 employees)",
    stage: "Scale-up",
    founded: 2017,
    location: "Reykjavik, Iceland",
    currentChallenge: {
      id: "ch10",
      area: "Underwater Exploration",
      description: "Develop autonomous underwater drones for deep-sea mapping",
      urgency: "Medium",
      budget: "$3M",
      timeline: "24 months",
      requiredExpertise: ["Robotics", "Oceanography", "AI/ML"],
    },
    previousCollaborations: ["Icelandic Marine Institute", "Kongsberg"],
    rdBudget: "$5M annually",
    preferredCollaborationType: ["Joint Research", "Product Co-Development"],
    areas: ["Underwater Exploration", "Marine Robotics", "Data Visualization"],
  },
  {
    id: "b11",
    name: "FutureFoods Labs",
    industry: "Food Technology",
    size: "Small (80 employees)",
    stage: "Start-up",
    founded: 2019,
    location: "Singapore",
    currentChallenge: {
      id: "ch11",
      area: "Alternative Proteins",
      description: "Scale production of lab-grown meat by 50%",
      urgency: "High",
      budget: "$4M",
      timeline: "18 months",
      requiredExpertise: [
        "Cellular Biology",
        "Food Engineering",
        "Bioprocessing",
      ],
    },
    previousCollaborations: [
      "National University of Singapore",
      "Temasek Holdings",
    ],
    rdBudget: "$2M annually",
    preferredCollaborationType: ["Joint Research", "Pilot Programs"],
    areas: [
      "Alternative Proteins",
      "Lab-Grown Meat",
      "Sustainable Agriculture",
    ],
  },
  {
    id: "b12",
    name: "SmartGrid Tech",
    industry: "Energy Technology",
    size: "Mid-size (400 employees)",
    stage: "Scale-up",
    founded: 2014,
    location: "Stockholm, Sweden",
    currentChallenge: {
      id: "ch12",
      area: "Grid Resilience",
      description: "Enhance power grid resilience against cyberattacks",
      urgency: "Medium",
      budget: "$2.5M",
      timeline: "24 months",
      requiredExpertise: [
        "Cybersecurity",
        "Electrical Engineering",
        "Energy Systems",
      ],
    },
    previousCollaborations: ["KTH Royal Institute of Technology", "Vattenfall"],
    rdBudget: "$6M annually",
    preferredCollaborationType: [
      "Public-Private Partnership",
      "Technology Licensing",
    ],
    areas: ["Grid Resilience", "Smart Metering", "Renewable Integration"],
  },
  {
    id: "b13",
    name: "EcoPackaging Solutions",
    industry: "Sustainability",
    size: "Small (120 employees)",
    stage: "Start-up",
    founded: 2018,
    location: "Seoul, South Korea",
    currentChallenge: {
      id: "ch13",
      area: "Biodegradable Packaging",
      description: "Reduce production costs of biodegradable materials by 30%",
      urgency: "High",
      budget: "$1.8M",
      timeline: "18 months",
      requiredExpertise: [
        "Materials Science",
        "Chemical Engineering",
        "Supply Chain Optimization",
      ],
    },
    previousCollaborations: ["KAIST", "Samsung Environmental Research"],
    rdBudget: "$3M annually",
    preferredCollaborationType: ["Joint Research", "Product Co-Development"],
    areas: [
      "Biodegradable Packaging",
      "Circular Economy",
      "Sustainable Materials",
    ],
  },
  {
    id: "b14",
    name: "HydroNext",
    industry: "Renewable Energy",
    size: "Large (1,000 employees)",
    stage: "Established",
    founded: 2006,
    location: "Zurich, Switzerland",
    currentChallenge: {
      id: "ch14",
      area: "Hydropower Optimization",
      description: "Boost hydropower plant efficiency by 15%",
      urgency: "Medium",
      budget: "$3.2M",
      timeline: "24 months",
      requiredExpertise: ["Fluid Dynamics", "Electrical Engineering", "AI/ML"],
    },
    previousCollaborations: ["ETH Zurich", "ABB"],
    rdBudget: "$12M annually",
    preferredCollaborationType: [
      "Public-Private Partnership",
      "Technology Licensing",
    ],
    areas: ["Hydropower", "Energy Efficiency", "Sustainable Engineering"],
  },
  {
    id: "b15",
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
    previousCollaborations: ["Massachusetts General Hospital", "IBM Research"],
    rdBudget: "$3M annually",
    preferredCollaborationType: ["Research Partnership", "IP Acquisition"],
    areas: ["AI in Healthcare", "Medical Diagnostics"],
  },
];

interface FetchCompaniesOptions {
  skip?: number;
  take?: number;
}

export async function fetchCompanies({
  skip = 0,
  take = 10,
}: FetchCompaniesOptions = {}): Promise<{
  companies: Company[];
  total: number;
}> {
  const result = COMPANIES.slice(skip, skip + take);
  return Promise.resolve({ companies: result, total: COMPANIES.length });
}
