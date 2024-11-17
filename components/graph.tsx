"use client";

import "@aws-amplify/ui-react/styles.css";

import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Typography, Slider } from "@mui/material";
import { downloadData } from 'aws-amplify/storage';
import { json } from "stream/consumers";
import { Company, fetchCompanies } from "@/lib/companies";

function transformGraph(graph) {
  const { nodes, links } = graph;

  // Transform nodes
  const transformedNodes = nodes.map((node) => {
    return {
      data: {
        id: node.id,
        label: node.name || node.id, // Use name if available, fallback to id
        ...node, // Spread all other properties to retain the additional metadata
      },
    };
  });

  // Transform links
  const transformedLinks = links.map((link) => {
    return {
      data: {
        source: link.source,
        target: link.target,
        label: link.relationship_type || "RELATIONSHIP", // Use relationship_type or a default
        ...link, // Spread all other properties to retain additional metadata
      },
    };
  });

  // Combine nodes and links into a single elements array
  return [...transformedNodes, ...transformedLinks];
}

const empty_graph = {
  "directed": false,
  "multigraph": false,
  "graph": {},
  "nodes": [
      {
          "type": "researcher",
          "name": "Alice Johansson",
          "title": "Senior Research Scientist",
          "institution": "Stanford University",
          "department": "Computer Science",
          "expertise": [
              "Machine Learning",
              "Computer Vision",
              "Neural Networks"
          ],
          "skills": [
              "Python",
              "TensorFlow",
              "PyTorch",
              "Research Design"
          ],
          "publications": [
              "Deep Learning Techniques in Healthcare",
              "Advanced Quantum Cryptography Protocols",
              "Bioplastics Derived from Algae: A Sustainable Approach"
          ],
          "patents": [
              "Method for Enhancing Neural Network Efficiency"
          ],
          "projectHistory": [
              "proj1",
              "proj3"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Computer Science",
                  "institution": "MIT",
                  "year": 2018
              }
          ],
          "certifications": [
              "Deep Learning Specialization"
          ],
          "availability": "Part-time collaboration",
          "desiredRoles": [
              "Technical Advisor",
              "Research Lead"
          ],
          "preferredIndustries": [
              "Healthcare",
              "Robotics"
          ],
          "location": "San Francisco, CA",
          "languages": [
              "English",
              "Mandarin"
          ],
          "id": "r1"
      },
      {
          "name": "Stanford University",
          "type": "institution",
          "id": "inst_Stanford_University"
      },
      {
          "type": "patent",
          "id": "pat1"
      },
      {
          "name": "Python",
          "type": "skill",
          "id": "skill_Python"
      },
      {
          "name": "TensorFlow",
          "type": "skill",
          "id": "skill_TensorFlow"
      },
      {
          "name": "PyTorch",
          "type": "skill",
          "id": "skill_PyTorch"
      },
      {
          "name": "Research Design",
          "type": "skill",
          "id": "skill_Research_Design"
      },
      {
          "type": "project",
          "id": "proj1"
      },
      {
          "type": "project",
          "id": "proj3"
      },
      {
          "institution": "MIT",
          "degree": "PhD",
          "field": "Computer Science",
          "type": "education",
          "id": "edu_MIT"
      },
      {
          "name": "Healthcare",
          "type": "industry",
          "id": "industry_Healthcare"
      },
      {
          "name": "Robotics",
          "type": "industry",
          "id": "industry_Robotics"
      },
      {
          "name": "Machine Learning",
          "type": "expertise",
          "id": "expertise_Machine_Learning"
      },
      {
          "name": "Computer Vision",
          "type": "expertise",
          "id": "expertise_Computer_Vision"
      },
      {
          "name": "Neural Networks",
          "type": "expertise",
          "id": "expertise_Neural_Networks"
      },
      {
          "type": "researcher",
          "name": "David M\u00fcller",
          "title": "Professor of Chemistry",
          "institution": "ETH Zurich",
          "expertise": [
              "Materials Science",
              "Nanotechnology",
              "Green Chemistry"
          ],
          "skills": [
              "Lab Management",
              "Grant Writing",
              "Materials Characterization"
          ],
          "publications": [
              "Next-Generation mRNA Vaccine Development",
              "Neural Interfaces for Robotics: A Study"
          ],
          "patents": [
              "Quantum Cryptographic Systems for IoT Devices",
              "Biodegradable Plastics from Algal Biomass"
          ],
          "projectHistory": [
              "proj2"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Chemistry",
                  "institution": "Cambridge University",
                  "year": 2010
              }
          ],
          "availability": "Research consulting",
          "location": "Zurich, Switzerland",
          "id": "r2"
      },
      {
          "name": "ETH Zurich",
          "type": "institution",
          "id": "inst_ETH_Zurich"
      },
      {
          "type": "patent",
          "id": "pat2"
      },
      {
          "type": "patent",
          "id": "pat3"
      },
      {
          "name": "Lab Management",
          "type": "skill",
          "id": "skill_Lab_Management"
      },
      {
          "name": "Grant Writing",
          "type": "skill",
          "id": "skill_Grant_Writing"
      },
      {
          "name": "Materials Characterization",
          "type": "skill",
          "id": "skill_Materials_Characterization"
      },
      {
          "type": "project",
          "id": "proj2"
      },
      {
          "institution": "Cambridge University",
          "degree": "PhD",
          "field": "Chemistry",
          "type": "education",
          "id": "edu_Cambridge_University"
      },
      {
          "name": "Materials Science",
          "type": "expertise",
          "id": "expertise_Materials_Science"
      },
      {
          "name": "Nanotechnology",
          "type": "expertise",
          "id": "expertise_Nanotechnology"
      },
      {
          "name": "Green Chemistry",
          "type": "expertise",
          "id": "expertise_Green_Chemistry"
      },
      {
          "type": "researcher",
          "name": "Emilia Garc\u00eda",
          "title": "Assistant Professor",
          "institution": "Harvard University",
          "department": "Physics",
          "expertise": [
              "Quantum Mechanics",
              "Optics",
              "Photonics"
          ],
          "skills": [
              "MATLAB",
              "Python",
              "Simulation Design"
          ],
          "publications": [
              "Digital Twin Technology for Smart Factories",
              "Green Chemistry in Sustainable Agriculture"
          ],
          "patents": [
              "CRISPR-Cas9 Gene Editing Mechanism"
          ],
          "projectHistory": [
              "proj4"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Physics",
                  "institution": "Harvard University",
                  "year": 2015
              }
          ],
          "availability": "Full-time teaching and research",
          "location": "Cambridge, MA",
          "languages": [
              "English",
              "French"
          ],
          "id": "r3"
      },
      {
          "name": "Harvard University",
          "type": "institution",
          "id": "inst_Harvard_University"
      },
      {
          "type": "patent",
          "id": "pat4"
      },
      {
          "name": "MATLAB",
          "type": "skill",
          "id": "skill_MATLAB"
      },
      {
          "name": "Simulation Design",
          "type": "skill",
          "id": "skill_Simulation_Design"
      },
      {
          "type": "project",
          "id": "proj4"
      },
      {
          "institution": "Harvard University",
          "degree": "PhD",
          "field": "Physics",
          "type": "education",
          "id": "edu_Harvard_University"
      },
      {
          "name": "Quantum Mechanics",
          "type": "expertise",
          "id": "expertise_Quantum_Mechanics"
      },
      {
          "name": "Optics",
          "type": "expertise",
          "id": "expertise_Optics"
      },
      {
          "name": "Photonics",
          "type": "expertise",
          "id": "expertise_Photonics"
      },
      {
          "type": "researcher",
          "name": "James Okafor",
          "title": "Data Scientist",
          "institution": "Google Research",
          "department": "AI Research",
          "expertise": [
              "Data Science",
              "Big Data Analytics",
              "Machine Learning"
          ],
          "skills": [
              "Python",
              "SQL",
              "TensorFlow",
              "Cloud Computing"
          ],
          "publications": [
              "AI-Driven Diagnosis for Rare Diseases",
              "Photonics for Quantum Computing Applications"
          ],
          "patents": [
              "Optimized Vaccine Delivery via mRNA Technology"
          ],
          "projectHistory": [
              "proj5"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Data Science",
                  "institution": "UC Berkeley",
                  "year": 2017
              }
          ],
          "availability": "Part-time collaboration",
          "location": "Mountain View, CA",
          "languages": [
              "English",
              "Korean"
          ],
          "id": "r4"
      },
      {
          "name": "Google Research",
          "type": "institution",
          "id": "inst_Google_Research"
      },
      {
          "type": "patent",
          "id": "pat5"
      },
      {
          "name": "SQL",
          "type": "skill",
          "id": "skill_SQL"
      },
      {
          "name": "Cloud Computing",
          "type": "skill",
          "id": "skill_Cloud_Computing"
      },
      {
          "type": "project",
          "id": "proj5"
      },
      {
          "institution": "UC Berkeley",
          "degree": "PhD",
          "field": "Data Science",
          "type": "education",
          "id": "edu_UC_Berkeley"
      },
      {
          "name": "Data Science",
          "type": "expertise",
          "id": "expertise_Data_Science"
      },
      {
          "name": "Big Data Analytics",
          "type": "expertise",
          "id": "expertise_Big_Data_Analytics"
      },
      {
          "type": "researcher",
          "name": "Olivia Nguyen",
          "title": "Senior Biologist",
          "institution": "National Institutes of Health",
          "department": "Biotechnology",
          "expertise": [
              "Gene Editing",
              "CRISPR",
              "Synthetic Biology"
          ],
          "skills": [
              "Lab Management",
              "DNA Sequencing",
              "Data Analysis"
          ],
          "publications": [
              "Carbon Capture Using Engineered Microalgae",
              "CRISPR Applications in Cancer Immunotherapy"
          ],
          "patents": [
              "Advanced Digital Twin Modelling for Predictive Maintenance"
          ],
          "projectHistory": [
              "proj6"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Biotechnology",
                  "institution": "Johns Hopkins University",
                  "year": 2016
              }
          ],
          "availability": "Full-time research",
          "location": "Bethesda, MD",
          "languages": [
              "English",
              "Spanish"
          ],
          "id": "r5"
      },
      {
          "name": "National Institutes of Health",
          "type": "institution",
          "id": "inst_National_Institutes_of_Health"
      },
      {
          "type": "patent",
          "id": "pat6"
      },
      {
          "name": "DNA Sequencing",
          "type": "skill",
          "id": "skill_DNA_Sequencing"
      },
      {
          "name": "Data Analysis",
          "type": "skill",
          "id": "skill_Data_Analysis"
      },
      {
          "type": "project",
          "id": "proj6"
      },
      {
          "institution": "Johns Hopkins University",
          "degree": "PhD",
          "field": "Biotechnology",
          "type": "education",
          "id": "edu_Johns_Hopkins_University"
      },
      {
          "name": "Gene Editing",
          "type": "expertise",
          "id": "expertise_Gene_Editing"
      },
      {
          "name": "CRISPR",
          "type": "expertise",
          "id": "expertise_CRISPR"
      },
      {
          "name": "Synthetic Biology",
          "type": "expertise",
          "id": "expertise_Synthetic_Biology"
      },
      {
          "type": "researcher",
          "name": "Maria Santos",
          "title": "AI Research Scientist",
          "institution": "Stanford University",
          "department": "Computer Science",
          "expertise": [
              "Machine Learning",
              "Computer Vision",
              "Natural Language Processing"
          ],
          "skills": [
              "Python",
              "TensorFlow",
              "PyTorch",
              "Deep Learning"
          ],
          "publications": [
              "Optimizing Renewable Energy with Smart Grids",
              "The Role of Nanotechnology in Modern Materials Science",
              "Gene Editing with CRISPR for Biotech Solutions"
          ],
          "patents": [
              "Sustainable Chemical Processes for Biofertilizer Production"
          ],
          "projectHistory": [
              "proj10",
              "proj11"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Computer Science",
                  "institution": "UC Berkeley",
                  "year": 2019
              }
          ],
          "availability": "Full-time research",
          "location": "San Francisco, CA",
          "id": "r6"
      },
      {
          "type": "patent",
          "id": "pat9"
      },
      {
          "name": "Deep Learning",
          "type": "skill",
          "id": "skill_Deep_Learning"
      },
      {
          "type": "project",
          "id": "proj10"
      },
      {
          "type": "project",
          "id": "proj11"
      },
      {
          "name": "Natural Language Processing",
          "type": "expertise",
          "id": "expertise_Natural_Language_Processing"
      },
      {
          "type": "researcher",
          "name": "Ethan Patel",
          "title": "AI Specialist",
          "institution": "Google Research",
          "department": "AI Research",
          "expertise": [
              "Machine Learning",
              "Natural Language Processing",
              "Computer Vision"
          ],
          "skills": [
              "Python",
              "TensorFlow",
              "Cloud Computing"
          ],
          "publications": [
              "Machine Learning for Natural Language Processing",
              "Deep Learning Techniques in Healthcare"
          ],
          "patents": [
              "Neural Interfaces for Robotic Arm Control"
          ],
          "projectHistory": [
              "proj1",
              "proj11"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Computer Science",
                  "institution": "MIT",
                  "year": 2020
              }
          ],
          "availability": "Part-time research",
          "location": "Mountain View, CA",
          "languages": [
              "English"
          ],
          "id": "r11"
      },
      {
          "type": "patent",
          "id": "pat15"
      },
      {
          "type": "researcher",
          "name": "Hannah Fadilah",
          "title": "Biotechnology Engineer",
          "institution": "National Institutes of Health",
          "department": "Biotechnology",
          "expertise": [
              "Synthetic Biology",
              "CRISPR",
              "Gene Editing"
          ],
          "skills": [
              "DNA Sequencing",
              "Lab Management",
              "Data Analysis"
          ],
          "publications": [
              "Advanced Quantum Cryptography Protocols",
              "Bioplastics Derived from Algae: A Sustainable Approach"
          ],
          "patents": [
              "High-Efficiency Renewable Energy Smart Grids"
          ],
          "projectHistory": [
              "proj6",
              "proj12"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Biotechnology",
                  "institution": "Johns Hopkins University",
                  "year": 2018
              }
          ],
          "availability": "Full-time research",
          "location": "Bethesda, MD",
          "languages": [
              "English",
              "French"
          ],
          "id": "r12"
      },
      {
          "type": "patent",
          "id": "pat16"
      },
      {
          "type": "project",
          "id": "proj12"
      },
      {
          "type": "researcher",
          "name": "Sofia Borg",
          "title": "Materials Scientist",
          "institution": "ETH Zurich",
          "department": "Chemistry",
          "expertise": [
              "Materials Science",
              "Nanotechnology",
              "Green Chemistry"
          ],
          "skills": [
              "Materials Characterization",
              "Lab Management",
              "Grant Writing"
          ],
          "publications": [
              "Next-Generation mRNA Vaccine Development",
              "Neural Interfaces for Robotics: A Study"
          ],
          "patents": [
              "Engineered Microalgae for Carbon Capture"
          ],
          "projectHistory": [
              "proj2",
              "proj13"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Materials Science",
                  "institution": "ETH Zurich",
                  "year": 2015
              }
          ],
          "availability": "Research consulting",
          "location": "Zurich, Switzerland",
          "languages": [
              "German",
              "English"
          ],
          "id": "r13"
      },
      {
          "type": "patent",
          "id": "pat17"
      },
      {
          "type": "project",
          "id": "proj13"
      },
      {
          "institution": "ETH Zurich",
          "degree": "PhD",
          "field": "Materials Science",
          "type": "education",
          "id": "edu_ETH_Zurich"
      },
      {
          "type": "researcher",
          "name": "Benjamin Rossi",
          "title": "Quantum Computing Specialist",
          "institution": "MIT",
          "department": "Physics",
          "expertise": [
              "Quantum Computing",
              "Quantum Error Correction",
              "Photonics"
          ],
          "skills": [
              "Python",
              "MATLAB",
              "Circuit Simulation"
          ],
          "publications": [
              "Digital Twin Technology for Smart Factories",
              "Green Chemistry in Sustainable Agriculture"
          ],
          "patents": [
              "Photonics-Based Quantum Computing Circuit Design"
          ],
          "projectHistory": [
              "proj4",
              "proj14"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Physics",
                  "institution": "Harvard University",
                  "year": 2017
              }
          ],
          "availability": "Full-time research",
          "location": "Cambridge, MA",
          "languages": [
              "English",
              "Korean"
          ],
          "id": "r14"
      },
      {
          "name": "MIT",
          "type": "institution",
          "id": "inst_MIT"
      },
      {
          "type": "patent",
          "id": "pat18"
      },
      {
          "name": "Circuit Simulation",
          "type": "skill",
          "id": "skill_Circuit_Simulation"
      },
      {
          "type": "project",
          "id": "proj14"
      },
      {
          "name": "Quantum Computing",
          "type": "expertise",
          "id": "expertise_Quantum_Computing"
      },
      {
          "name": "Quantum Error Correction",
          "type": "expertise",
          "id": "expertise_Quantum_Error_Correction"
      },
      {
          "type": "researcher",
          "name": "Chloe Dubois",
          "title": "Robotics Researcher",
          "institution": "Stanford University",
          "department": "Computer Science",
          "expertise": [
              "Humanoid Robotics",
              "Machine Learning",
              "Control Systems"
          ],
          "skills": [
              "Python",
              "TensorFlow",
              "Control Theory",
              "ROS"
          ],
          "publications": [
              "AI-Driven Diagnosis for Rare Diseases",
              "Photonics for Quantum Computing Applications"
          ],
          "patents": [
              "Robotics Motion Control Using AI Optimization"
          ],
          "projectHistory": [
              "proj5",
              "proj8"
          ],
          "education": [
              {
                  "degree": "PhD",
                  "field": "Robotics",
                  "institution": "UC Berkeley",
                  "year": 2019
              }
          ],
          "availability": "Project-based",
          "location": "San Francisco, CA",
          "languages": [
              "English",
              "Japanese"
          ],
          "id": "r15"
      },
      {
          "type": "patent",
          "id": "pat19"
      },
      {
          "name": "Control Theory",
          "type": "skill",
          "id": "skill_Control_Theory"
      },
      {
          "name": "ROS",
          "type": "skill",
          "id": "skill_ROS"
      },
      {
          "type": "project",
          "id": "proj8"
      },
      {
          "name": "Humanoid Robotics",
          "type": "expertise",
          "id": "expertise_Humanoid_Robotics"
      },
      {
          "name": "Control Systems",
          "type": "expertise",
          "id": "expertise_Control_Systems"
      },
      {
          "type": "business",
          "name": "Bluebird Robotics",
          "industry": "Finance",
          "location": "UK",
          "id": "b1"
      },
      {
          "type": "business",
          "name": "Evergreen Energy Solutions",
          "industry": "Biotech",
          "location": "Germany",
          "id": "b2"
      },
      {
          "type": "business",
          "name": "Nimbus AI",
          "industry": "Finance",
          "location": "Germany",
          "id": "b3"
      },
      {
          "type": "business",
          "name": "Quantum Materials, Inc.",
          "industry": "AI",
          "location": "Germany",
          "id": "b4"
      },
      {
          "type": "business",
          "name": "GreenLeaf BioTech",
          "industry": "Finance",
          "location": "UK",
          "id": "b5"
      },
      {
          "type": "business",
          "name": "Oceanic Analytics",
          "industry": "Biotech",
          "location": "UK",
          "id": "b6"
      },
      {
          "type": "business",
          "name": "PineTree Software",
          "industry": "Finance",
          "location": "Switzerland",
          "id": "b7"
      },
      {
          "type": "business",
          "name": "Sunbeam Electronics",
          "industry": "Finance",
          "location": "Japan",
          "id": "b8"
      },
      {
          "type": "business",
          "name": "Vortex Cybernetics",
          "industry": "Energy",
          "location": "Switzerland",
          "id": "b9"
      },
      {
          "type": "business",
          "name": "Stellar Dynamics",
          "industry": "AI",
          "location": "Japan",
          "id": "b10"
      },
      {
          "type": "project-proposal",
          "title": "AI-Powered Diagnosis System for Rare Diseases",
          "abstract": "This project aims to develop an artificial intelligence-powered diagnostic tool to identify rare diseases based on patient symptoms, genetic data, and medical imaging.",
          "id": "pp1"
      },
      {
          "type": "project-proposal",
          "title": "Green Chemistry Solutions for Sustainable Agriculture",
          "abstract": "The project focuses on creating sustainable, eco-friendly chemical processes to produce biofertilizers and pest-control agents.",
          "id": "pp2"
      },
      {
          "type": "project-proposal",
          "title": "Quantum Cryptography for Securing IoT Devices",
          "abstract": "This project aims to integrate quantum cryptography techniques into Internet-of-Things (IoT) devices to secure communications against quantum computing attacks.",
          "id": "pp3"
      },
      {
          "type": "project-proposal",
          "title": "Harnessing CRISPR for Cancer Immunotherapy",
          "abstract": "The objective of this research is to explore the use of CRISPR-Cas9 technology to engineer immune cells capable of targeting and destroying cancer cells.",
          "id": "pp4"
      },
      {
          "type": "project-proposal",
          "title": "Digital Twins for Predictive Maintenance in Smart Factories",
          "abstract": "This proposal seeks to develop digital twin technology to model and predict the behavior of industrial machinery in smart factories.",
          "id": "pp5"
      },
      {
          "type": "project-proposal",
          "title": "Sustainable Bioplastics from Algal Biomass",
          "abstract": "This initiative proposes developing biodegradable plastics derived from algal biomass as a sustainable alternative to traditional petroleum-based plastics.",
          "id": "pp6"
      },
      {
          "type": "project-proposal",
          "title": "Neural Interfaces for Assistive Robotics",
          "abstract": "The project focuses on developing advanced neural interfaces to control assistive robotic devices for individuals with disabilities.",
          "id": "pp7"
      },
      {
          "type": "project-proposal",
          "title": "Smart Grids for Renewable Energy Optimization",
          "abstract": "This project proposes the development of intelligent grid systems to optimize the integration and distribution of renewable energy sources like solar and wind.",
          "id": "pp8"
      },
      {
          "type": "project-proposal",
          "title": "Next-Generation Vaccine Platforms Using mRNA",
          "abstract": "This proposal aims to design a scalable platform for rapid mRNA vaccine development to combat emerging infectious diseases.",
          "id": "pp9"
      },
      {
          "type": "project-proposal",
          "title": "Oceanic Carbon Capture Using Engineered Microalgae",
          "abstract": "The project explores the potential of genetically engineered microalgae to capture atmospheric carbon dioxide and convert it into bioenergy.",
          "id": "pp10"
      },
      {
          "id": "skill_Quantum_Mechanics"
      },
       {
          "type": "investor",
          "name": "Aurora Capital Partners",
          "industry": "Tech",
          "location": "USA",
          "id": "inv1"
      },
      {
          "type": "investor",
          "name": "Summit Healthcare Ventures",
          "industry": "Healthcare",
          "location": "Canada",
          "id": "inv2"
      },
      {
          "type": "investor",
          "name": "Europa Growth Fund",
          "industry": "Finance",
          "location": "Germany",
          "id": "inv3"
      },
      {
          "type": "investor",
          "name": "Crestfield Biotech Partners",
          "industry": "Biotech",
          "location": "UK",
          "id": "inv4"
      },
      {
          "type": "investor",
          "name": "Alpine Renewable Energy Investments",
          "industry": "Energy",
          "location": "Switzerland",
          "id": "inv5"
      }
  ],
  "links": [
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.92,
          "distance": 0.08,
          "source": "inv1",
          "target": "b1"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.85,
          "distance": 0.15,
          "source": "inv2",
          "target": "r5"
      },
      {
          "relationship_type": "FUNDS",
          "weight": 1,
          "score": 0.87,
          "distance": 0.13,
          "source": "inv3",
          "target": "pp7"
      },
      {
          "relationship_type": "PARTNERS_WITH",
          "weight": 1,
          "score": 0.89,
          "distance": 0.11,
          "source": "inv4",
          "target": "b6"
      },
      {
          "relationship_type": "SUPPORTS",
          "weight": 1,
          "score": 0.93,
          "distance": 0.07,
          "source": "inv5",
          "target": "pp8"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.751662015914917,
          "distance": 0.248337984085083,
          "source": "r1",
          "target": "inst_Stanford_University"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9339495301246643,
          "distance": 0.0660504698753357,
          "source": "r1",
          "target": "pat1"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.6382083296775818,
          "distance": 0.3617916703224182,
          "source": "r1",
          "target": "skill_Python"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7032788395881653,
          "distance": 0.2967211604118347,
          "source": "r1",
          "target": "skill_TensorFlow"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8521302938461304,
          "distance": 0.14786970615386963,
          "source": "r1",
          "target": "skill_PyTorch"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9230166077613831,
          "distance": 0.07698339223861694,
          "source": "r1",
          "target": "skill_Research_Design"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.8167360424995422,
          "distance": 0.18326395750045776,
          "source": "r1",
          "target": "proj1"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9152500033378601,
          "distance": 0.08474999666213989,
          "source": "r1",
          "target": "proj3"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.7063582539558411,
          "distance": 0.29364174604415894,
          "source": "r1",
          "target": "edu_MIT"
      },
      {
          "relationship_type": "INTERESTED_IN",
          "weight": 1,
          "score": 0.913553774356842,
          "distance": 0.08644622564315796,
          "source": "r1",
          "target": "industry_Healthcare"
      },
      {
          "relationship_type": "INTERESTED_IN",
          "weight": 1,
          "score": 0.9284135699272156,
          "distance": 0.07158643007278442,
          "source": "r1",
          "target": "industry_Robotics"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.6792247295379639,
          "distance": 0.32077527046203613,
          "source": "r1",
          "target": "expertise_Machine_Learning"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.7672817707061768,
          "distance": 0.23271822929382324,
          "source": "r1",
          "target": "expertise_Computer_Vision"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9111582636833191,
          "distance": 0.08884173631668091,
          "source": "r1",
          "target": "expertise_Neural_Networks"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.907422661781311,
          "distance": 0.09257733821868896,
          "source": "r1",
          "target": "b1"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.6778448224067688,
          "distance": 0.3221551775932312,
          "source": "r1",
          "target": "b3"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6200243234634399,
          "distance": 0.37997567653656006,
          "source": "r1",
          "target": "pp10"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.7051255106925964,
          "distance": 0.29487448930740356,
          "source": "inst_Stanford_University",
          "target": "r6"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.743429958820343,
          "distance": 0.256570041179657,
          "source": "inst_Stanford_University",
          "target": "r15"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.6777682304382324,
          "distance": 0.3222317695617676,
          "source": "skill_Python",
          "target": "r3"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.5121235251426697,
          "distance": 0.4878764748573303,
          "source": "skill_Python",
          "target": "r4"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.6737344861030579,
          "distance": 0.32626551389694214,
          "source": "skill_Python",
          "target": "r6"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.5576748251914978,
          "distance": 0.4423251748085022,
          "source": "skill_Python",
          "target": "r11"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7327316999435425,
          "distance": 0.2672683000564575,
          "source": "skill_Python",
          "target": "r14"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.5548943877220154,
          "distance": 0.4451056122779846,
          "source": "skill_Python",
          "target": "r15"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.6570869088172913,
          "distance": 0.34291309118270874,
          "source": "skill_TensorFlow",
          "target": "r4"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7271935939788818,
          "distance": 0.27280640602111816,
          "source": "skill_TensorFlow",
          "target": "r6"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.6474078297615051,
          "distance": 0.3525921702384949,
          "source": "skill_TensorFlow",
          "target": "r11"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.733914852142334,
          "distance": 0.266085147857666,
          "source": "skill_TensorFlow",
          "target": "r15"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8028717637062073,
          "distance": 0.19712823629379272,
          "source": "skill_PyTorch",
          "target": "r6"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.7780381441116333,
          "distance": 0.2219618558883667,
          "source": "proj1",
          "target": "r11"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.6981474757194519,
          "distance": 0.3018525242805481,
          "source": "edu_MIT",
          "target": "r11"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9142256379127502,
          "distance": 0.08577436208724976,
          "source": "edu_MIT",
          "target": "pat16"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.578403890132904,
          "distance": 0.42159610986709595,
          "source": "expertise_Machine_Learning",
          "target": "r4"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.7014851570129395,
          "distance": 0.29851484298706055,
          "source": "expertise_Machine_Learning",
          "target": "r6"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.6580132246017456,
          "distance": 0.3419867753982544,
          "source": "expertise_Machine_Learning",
          "target": "r11"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.72807776927948,
          "distance": 0.27192223072052,
          "source": "expertise_Machine_Learning",
          "target": "r15"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8000528216362,
          "distance": 0.19994717836380005,
          "source": "expertise_Computer_Vision",
          "target": "r6"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.7253841161727905,
          "distance": 0.2746158838272095,
          "source": "expertise_Computer_Vision",
          "target": "r11"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.9275560975074768,
          "distance": 0.0724439024925232,
          "source": "r2",
          "target": "inst_ETH_Zurich"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.951764702796936,
          "distance": 0.048235297203063965,
          "source": "r2",
          "target": "pat2"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9446094036102295,
          "distance": 0.05539059638977051,
          "source": "r2",
          "target": "pat3"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7877688407897949,
          "distance": 0.21223115921020508,
          "source": "r2",
          "target": "skill_Lab_Management"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9294901490211487,
          "distance": 0.07050985097885132,
          "source": "r2",
          "target": "skill_Grant_Writing"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9060070514678955,
          "distance": 0.09399294853210449,
          "source": "r2",
          "target": "skill_Materials_Characterization"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9390265941619873,
          "distance": 0.060973405838012695,
          "source": "r2",
          "target": "proj2"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.9556083083152771,
          "distance": 0.0443916916847229,
          "source": "r2",
          "target": "edu_Cambridge_University"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.929760754108429,
          "distance": 0.07023924589157104,
          "source": "r2",
          "target": "expertise_Materials_Science"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9331785440444946,
          "distance": 0.06682145595550537,
          "source": "r2",
          "target": "expertise_Nanotechnology"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9161401391029358,
          "distance": 0.08385986089706421,
          "source": "r2",
          "target": "expertise_Green_Chemistry"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.9215738773345947,
          "distance": 0.07842612266540527,
          "source": "inst_ETH_Zurich",
          "target": "r13"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.6862744092941284,
          "distance": 0.3137255907058716,
          "source": "skill_Lab_Management",
          "target": "r5"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.668823778629303,
          "distance": 0.331176221370697,
          "source": "skill_Lab_Management",
          "target": "r12"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7136839628219604,
          "distance": 0.28631603717803955,
          "source": "skill_Lab_Management",
          "target": "r13"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7357356548309326,
          "distance": 0.2642643451690674,
          "source": "skill_Lab_Management",
          "target": "b10"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9161855578422546,
          "distance": 0.08381444215774536,
          "source": "skill_Grant_Writing",
          "target": "r13"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9036382436752319,
          "distance": 0.09636175632476807,
          "source": "skill_Materials_Characterization",
          "target": "r13"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9092594981193542,
          "distance": 0.09074050188064575,
          "source": "proj2",
          "target": "r13"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9073178768157959,
          "distance": 0.0926821231842041,
          "source": "expertise_Materials_Science",
          "target": "r13"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.924045741558075,
          "distance": 0.07595425844192505,
          "source": "expertise_Nanotechnology",
          "target": "r13"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8982256054878235,
          "distance": 0.10177439451217651,
          "source": "expertise_Green_Chemistry",
          "target": "r13"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.9100461602210999,
          "distance": 0.08995383977890015,
          "source": "r3",
          "target": "inst_Harvard_University"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9319858551025391,
          "distance": 0.06801414489746094,
          "source": "r3",
          "target": "pat4"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8735886812210083,
          "distance": 0.1264113187789917,
          "source": "r3",
          "target": "skill_MATLAB"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9241320490837097,
          "distance": 0.07586795091629028,
          "source": "r3",
          "target": "skill_Simulation_Design"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.6982676982879639,
          "distance": 0.30173230171203613,
          "source": "r3",
          "target": "proj4"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.881278932094574,
          "distance": 0.11872106790542603,
          "source": "r3",
          "target": "edu_Harvard_University"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9379793405532837,
          "distance": 0.06202065944671631,
          "source": "r3",
          "target": "expertise_Quantum_Mechanics"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9300999641418457,
          "distance": 0.0699000358581543,
          "source": "r3",
          "target": "expertise_Optics"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8596802949905396,
          "distance": 0.14031970500946045,
          "source": "r3",
          "target": "expertise_Photonics"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6634252071380615,
          "distance": 0.3365747928619385,
          "source": "r3",
          "target": "pp1"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7312055826187134,
          "distance": 0.2687944173812866,
          "source": "r3",
          "target": "pp3"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7190486788749695,
          "distance": 0.2809513211250305,
          "source": "r3",
          "target": "pp4"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7460838556289673,
          "distance": 0.2539161443710327,
          "source": "r3",
          "target": "pp6"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8975017666816711,
          "distance": 0.10249823331832886,
          "source": "skill_MATLAB",
          "target": "r14"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.7345767617225647,
          "distance": 0.2654232382774353,
          "source": "proj4",
          "target": "r14"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.7720005512237549,
          "distance": 0.22799944877624512,
          "source": "proj4",
          "target": "b5"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.8783897757530212,
          "distance": 0.12161022424697876,
          "source": "edu_Harvard_University",
          "target": "r14"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.849388837814331,
          "distance": 0.15061116218566895,
          "source": "expertise_Photonics",
          "target": "r14"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.7156929969787598,
          "distance": 0.28430700302124023,
          "source": "r4",
          "target": "inst_Google_Research"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.8693819046020508,
          "distance": 0.13061809539794922,
          "source": "r4",
          "target": "pat5"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8526476621627808,
          "distance": 0.14735233783721924,
          "source": "r4",
          "target": "skill_SQL"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7157129049301147,
          "distance": 0.28428709506988525,
          "source": "r4",
          "target": "skill_Cloud_Computing"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.715485692024231,
          "distance": 0.28451430797576904,
          "source": "r4",
          "target": "proj5"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.6517190337181091,
          "distance": 0.34828096628189087,
          "source": "r4",
          "target": "edu_UC_Berkeley"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8462470173835754,
          "distance": 0.15375298261642456,
          "source": "r4",
          "target": "expertise_Data_Science"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8559567928314209,
          "distance": 0.1440432071685791,
          "source": "r4",
          "target": "expertise_Big_Data_Analytics"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.43226733803749084,
          "distance": 0.5677326619625092,
          "source": "r4",
          "target": "pp1"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.5515877604484558,
          "distance": 0.4484122395515442,
          "source": "r4",
          "target": "pp3"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7012616395950317,
          "distance": 0.29873836040496826,
          "source": "r4",
          "target": "pp4"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6833159327507019,
          "distance": 0.3166840672492981,
          "source": "r4",
          "target": "pp5"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6854910850524902,
          "distance": 0.31450891494750977,
          "source": "r4",
          "target": "pp6"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.7298405766487122,
          "distance": 0.27015942335128784,
          "source": "inst_Google_Research",
          "target": "r11"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.7198097705841064,
          "distance": 0.28019022941589355,
          "source": "skill_Cloud_Computing",
          "target": "r11"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.8056509494781494,
          "distance": 0.19434905052185059,
          "source": "proj5",
          "target": "r15"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.745863676071167,
          "distance": 0.254136323928833,
          "source": "edu_UC_Berkeley",
          "target": "r6"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.7723073363304138,
          "distance": 0.22769266366958618,
          "source": "edu_UC_Berkeley",
          "target": "r15"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.9107484221458435,
          "distance": 0.0892515778541565,
          "source": "r5",
          "target": "inst_National_Institutes_of_Health"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9154778122901917,
          "distance": 0.08452218770980835,
          "source": "r5",
          "target": "pat6"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9129844307899475,
          "distance": 0.08701556921005249,
          "source": "r5",
          "target": "skill_DNA_Sequencing"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9109633564949036,
          "distance": 0.08903664350509644,
          "source": "r5",
          "target": "skill_Data_Analysis"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9104633927345276,
          "distance": 0.08953660726547241,
          "source": "r5",
          "target": "proj6"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.8742079138755798,
          "distance": 0.12579208612442017,
          "source": "r5",
          "target": "edu_Johns_Hopkins_University"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9007895588874817,
          "distance": 0.09921044111251831,
          "source": "r5",
          "target": "expertise_Gene_Editing"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9017404317855835,
          "distance": 0.0982595682144165,
          "source": "r5",
          "target": "expertise_CRISPR"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9060786962509155,
          "distance": 0.09392130374908447,
          "source": "r5",
          "target": "expertise_Synthetic_Biology"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.7818198800086975,
          "distance": 0.2181801199913025,
          "source": "r5",
          "target": "b2"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.938651978969574,
          "distance": 0.061348021030426025,
          "source": "r5",
          "target": "b4"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.7837292551994324,
          "distance": 0.21627074480056763,
          "source": "r5",
          "target": "b8"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9291046857833862,
          "distance": 0.07089531421661377,
          "source": "r5",
          "target": "skill_Quantum_Mechanics"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.8520680665969849,
          "distance": 0.14793193340301514,
          "source": "r5",
          "target": "pp8"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7021045684814453,
          "distance": 0.2978954315185547,
          "source": "r5",
          "target": "pp9"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.9128786325454712,
          "distance": 0.08712136745452881,
          "source": "inst_National_Institutes_of_Health",
          "target": "r12"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9096161127090454,
          "distance": 0.09038388729095459,
          "source": "skill_DNA_Sequencing",
          "target": "r12"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8929258584976196,
          "distance": 0.10707414150238037,
          "source": "skill_Data_Analysis",
          "target": "r12"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9154214262962341,
          "distance": 0.08457857370376587,
          "source": "proj6",
          "target": "r12"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.9224997162818909,
          "distance": 0.07750028371810913,
          "source": "edu_Johns_Hopkins_University",
          "target": "r12"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.913744330406189,
          "distance": 0.08625566959381104,
          "source": "expertise_Gene_Editing",
          "target": "r12"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8968631029129028,
          "distance": 0.10313689708709717,
          "source": "expertise_CRISPR",
          "target": "r12"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.8947707414627075,
          "distance": 0.10522925853729248,
          "source": "expertise_Synthetic_Biology",
          "target": "r12"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9079917073249817,
          "distance": 0.09200829267501831,
          "source": "r6",
          "target": "pat9"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.8712131381034851,
          "distance": 0.1287868618965149,
          "source": "r6",
          "target": "skill_Deep_Learning"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.8862299919128418,
          "distance": 0.1137700080871582,
          "source": "r6",
          "target": "proj10"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.8251315951347351,
          "distance": 0.1748684048652649,
          "source": "r6",
          "target": "proj11"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.7715297341346741,
          "distance": 0.22847026586532593,
          "source": "r6",
          "target": "expertise_Natural_Language_Processing"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.7575926184654236,
          "distance": 0.24240738153457642,
          "source": "r6",
          "target": "b2"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.771466851234436,
          "distance": 0.22853314876556396,
          "source": "proj11",
          "target": "r11"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.7921454310417175,
          "distance": 0.20785456895828247,
          "source": "expertise_Natural_Language_Processing",
          "target": "r11"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.8698340654373169,
          "distance": 0.1301659345626831,
          "source": "r11",
          "target": "pat15"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.6637129783630371,
          "distance": 0.3362870216369629,
          "source": "r11",
          "target": "b7"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.5789118409156799,
          "distance": 0.42108815908432007,
          "source": "r11",
          "target": "pp2"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6347981691360474,
          "distance": 0.36520183086395264,
          "source": "r11",
          "target": "pp7"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.7825180888175964,
          "distance": 0.21748191118240356,
          "source": "r12",
          "target": "pat16"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9417135715484619,
          "distance": 0.058286428451538086,
          "source": "r12",
          "target": "proj12"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.7300081849098206,
          "distance": 0.26999181509017944,
          "source": "r12",
          "target": "b9"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.8116283416748047,
          "distance": 0.1883716583251953,
          "source": "r12",
          "target": "pp8"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7295665144920349,
          "distance": 0.2704334855079651,
          "source": "r12",
          "target": "pp10"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9254023432731628,
          "distance": 0.07459765672683716,
          "source": "r13",
          "target": "pat17"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9113011360168457,
          "distance": 0.0886988639831543,
          "source": "r13",
          "target": "proj13"
      },
      {
          "relationship_type": "STUDIED_AT",
          "weight": 1,
          "score": 0.9500384330749512,
          "distance": 0.04996156692504883,
          "source": "r13",
          "target": "edu_ETH_Zurich"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.6711415648460388,
          "distance": 0.3288584351539612,
          "source": "r13",
          "target": "b7"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.6369448304176331,
          "distance": 0.36305516958236694,
          "source": "r13",
          "target": "b10"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7252457141876221,
          "distance": 0.27475428581237793,
          "source": "r13",
          "target": "pp2"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6519453525543213,
          "distance": 0.3480546474456787,
          "source": "r13",
          "target": "pp5"
      },
      {
          "relationship_type": "AFFILIATED_WITH",
          "weight": 1,
          "score": 0.926023006439209,
          "distance": 0.07397699356079102,
          "source": "r14",
          "target": "inst_MIT"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.9438148736953735,
          "distance": 0.056185126304626465,
          "source": "r14",
          "target": "pat18"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9200151562690735,
          "distance": 0.07998484373092651,
          "source": "r14",
          "target": "skill_Circuit_Simulation"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9226289987564087,
          "distance": 0.07737100124359131,
          "source": "r14",
          "target": "proj14"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9489657878875732,
          "distance": 0.05103421211242676,
          "source": "r14",
          "target": "expertise_Quantum_Computing"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9240187406539917,
          "distance": 0.0759812593460083,
          "source": "r14",
          "target": "expertise_Quantum_Error_Correction"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7099754810333252,
          "distance": 0.2900245189666748,
          "source": "r14",
          "target": "pp3"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7787389755249023,
          "distance": 0.22126102447509766,
          "source": "r14",
          "target": "pp4"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.7993305921554565,
          "distance": 0.20066940784454346,
          "source": "r14",
          "target": "pp6"
      },
      {
          "relationship_type": "HOLDS_PATENT",
          "weight": 1,
          "score": 0.910133421421051,
          "distance": 0.08986657857894897,
          "source": "r15",
          "target": "pat19"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9121344685554504,
          "distance": 0.08786553144454956,
          "source": "r15",
          "target": "skill_Control_Theory"
      },
      {
          "relationship_type": "HAS_SKILL",
          "weight": 1,
          "score": 0.9301926493644714,
          "distance": 0.06980735063552856,
          "source": "r15",
          "target": "skill_ROS"
      },
      {
          "relationship_type": "WORKED_ON",
          "weight": 1,
          "score": 0.9139814972877502,
          "distance": 0.08601850271224976,
          "source": "r15",
          "target": "proj8"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9157883524894714,
          "distance": 0.08421164751052856,
          "source": "r15",
          "target": "expertise_Humanoid_Robotics"
      },
      {
          "relationship_type": "EXPERT_IN",
          "weight": 1,
          "score": 0.9010007381439209,
          "distance": 0.0989992618560791,
          "source": "r15",
          "target": "expertise_Control_Systems"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.633206844329834,
          "distance": 0.366793155670166,
          "source": "r15",
          "target": "b5"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.7183283567428589,
          "distance": 0.2816716432571411,
          "source": "r15",
          "target": "b6"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6279019117355347,
          "distance": 0.37209808826446533,
          "source": "r15",
          "target": "pp7"
      },
      {
          "relationship_type": "RELATED_TO",
          "weight": 1,
          "score": 0.6970650553703308,
          "distance": 0.3029349446296692,
          "source": "r15",
          "target": "pp9"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.8621235489845276,
          "distance": 0.1378764510154724,
          "source": "b3",
          "target": "pp4"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.8624528050422668,
          "distance": 0.13754719495773315,
          "source": "b3",
          "target": "pp6"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.6714717149734497,
          "distance": 0.3285282850265503,
          "source": "b5",
          "target": "pp2"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.6524637937545776,
          "distance": 0.34753620624542236,
          "source": "b5",
          "target": "pp7"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.7864732146263123,
          "distance": 0.21352678537368774,
          "source": "b5",
          "target": "pp9"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.6431921124458313,
          "distance": 0.3568078875541687,
          "source": "b5",
          "target": "pp10"
      },
      {
          "relationship_type": "COLLABORATES_WITH",
          "weight": 1,
          "score": 0.8446584343910217,
          "distance": 0.15534156560897827,
          "source": "b6",
          "target": "b10"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.6897220611572266,
          "distance": 0.31027793884277344,
          "source": "b7",
          "target": "pp1"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.7863597869873047,
          "distance": 0.2136402130126953,
          "source": "b7",
          "target": "pp7"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.8484033942222595,
          "distance": 0.15159660577774048,
          "source": "b8",
          "target": "pp5"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.9203981757164001,
          "distance": 0.07960182428359985,
          "source": "b8",
          "target": "pp8"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.7787118554115295,
          "distance": 0.22128814458847046,
          "source": "b9",
          "target": "pp1"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.8572706580162048,
          "distance": 0.14272934198379517,
          "source": "b9",
          "target": "pp10"
      },
      {
          "relationship_type": "SUPPORTED_BY",
          "weight": 1,
          "score": 0.7793448567390442,
          "distance": 0.2206551432609558,
          "source": "b10",
          "target": "pp3"
      }
  ]
};


export default function HERGraph() {
  const [maxDistance, setMaxDistance] = useState(0.29);
  const [cyInstance, setCyInstance] = useState<any>(null);

  let elements = transformGraph(empty_graph);



  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setMaxDistance(newValue as number);
  };

  // Filter nodes and their edges dynamically
  const filteredElements = (() => {
    const visibleNodes = new Set<string>();

    const visibleEdges = elements.filter((element) => {
      if (element.data?.source && element.data?.target) {
        // Include edge if it meets the maxDistance criteria
        if (element.data.distance <= maxDistance) {
          visibleNodes.add(element.data.source);
          visibleNodes.add(element.data.target);
          return true;
        }
        return false;
      }
      return false; // Exclude non-edge elements here temporarily
    });

    const visibleNodesElements = elements.filter((element) => {
      // Include node if it's in the visibleNodes set
      return element.data?.id && visibleNodes.has(element.data.id);
    });

    return [...visibleNodesElements, ...visibleEdges];
  })();

  // Center the specialNode in the viewport whenever the graph updates
  useEffect(() => {
    if (cyInstance) {
      const specialNode = cyInstance.getElementById("r3");

      if (specialNode) {
        cyInstance.center(specialNode);
      }
    }
  }, [cyInstance, filteredElements]);

  return (
    <Box>
      {/* Graph */}
      <CytoscapeComponent
        elements={filteredElements}
        style={{
          height: "75vh",
        }}
        layout={{
          name: "cose",
          animate: true, // Enable animation
          animationDuration: 3000, // 3-second animation
          animationEasing: "ease-in-out",
          fit: true,
          
          padding: 30, // Add padding for a smoother layout
          randomize: false, // Disable random initial positions for nodes
          idealEdgeLength: (edge) => 200, // Increase ideal edge length for smoother layout

          edgeElasticity: (edge) => {
            // Use distance to set edge elasticity
            return edge.data("distance") * 2000; // Adjust multiplier as needed
          },
          nodeRepulsion: (edge) => 8000, // Increase node repulsion for less overlap
          numIter: 2000, // Increase iterations for stability
        }}
        cy={(cy) => {
          setCyInstance(cy); // Store the Cytoscape instance for viewport manipulation
          cy.minZoom(0.75);
          cy.maxZoom(2);
        }}
        stylesheet={[
          {
            selector: "node",
            style: {
              "text-valign": "bottom", // Place text below the node
              label: "data(label)", // Use the node's label
              "font-size": "10px",
              color: "#fff", // White text for better contrast
              "text-margin-y": 10, // Adjust label position below the node
              "border-width": 2,
              "border-color": "#333333",
              width: 60,
              height: 60,
            },
          },
          {
            selector: "node[id = 'r3']",
            style: {
              "background-color": "#3391fd",
              "border-width": 4,
              "border-color": "#3391fd",
              "border-style": "solid",
              width: 80,
              height: 80,
            },
          },
          {
          selector: "node[type = 'business']",
          style: {
            "background-color": "#a03030",
            "border-width": 4,
            "border-color": "#a03030",
            "border-style": "solid",
            width: 60,
            height: 60,
          },
        },{ 
          selector: "node[type = 'project-proposal']",
          style: {
            "background-color": "#20aa03",
            "border-width": 4,
            "border-color": "#20aa03",
            "border-style": "solid",
            width: 60,
            height: 60,
          },
        },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#6C757D",
              "target-arrow-color": "#6C757D",
              "target-arrow-shape": "triangle",
              label: "data(label)",
              "font-size": "10px",
              "text-rotation": "autorotate",
              "text-margin-y": -10,
              color: "#FFFFFF",
              "curve-style": "bezier",
            },
          },
        ]}
      />

      {/* Slider */}
      <Box p={4} width={"600px"}>
        <Typography gutterBottom>Similarity</Typography>
        <Box p={2}>
          <Slider
            value={maxDistance}
            min={0.035}
            max={1} // Allow values up to 10
            step={0.05}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            marks={[
              { value: 0.035, label: "Free" },
              { value: 0.145, label: "Verified" },
              { value: 0.350, label: "Premium" },
            ]}
            sx={{
              "& .MuiSlider-track": {
                background: maxDistance < 3 ? "#3391fd" : "#e53935", // Blue for Free/Verified, Red for Premium and above
              },
              "& .MuiSlider-thumb": {
                background: maxDistance < 3 ? "#3391fd" : "#e53935", // Thumb matches section color
              },
              "& .MuiSlider-markLabel": {
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
