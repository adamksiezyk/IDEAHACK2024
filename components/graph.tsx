"use client";

import "@aws-amplify/ui-react/styles.css";

import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Typography, Slider } from "@mui/material";

const elements = [
  // Researchers
  {
    data: {
      id: "r3",
      label: "Dr. Emily Carter",
      type: "researcher",
      institution: "Harvard University",
      department: "Physics",
      skills: ["MATLAB", "Python", "Simulation Design"],
      distance: 0,
    },
  },
  {
    data: {
      id: "r6",
      label: "Dr. Maria Santos",
      type: "researcher",
      institution: "Stanford University",
      department: "Computer Science",
      skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
      distance: 3,
    },
  },
  {
    data: {
      id: "r14",
      label: "Dr. Rachel Kim",
      type: "researcher",
      institution: "MIT",
      department: "Physics",
      skills: ["Python", "MATLAB", "Circuit Simulation"],
      distance: 5,
    },
  },
  {
    data: {
      id: "r15",
      label: "Dr. Sophia Brown",
      type: "researcher",
      institution: "Stanford University",
      department: "Computer Science",
      skills: ["Python", "TensorFlow", "Control Theory", "ROS"],
      distance: 3,
    },
  },
  {
    data: {
      id: "r1",
      label: "Dr. Sarah Chen",
      type: "researcher",
      institution: "Stanford University",
      department: "Computer Science",
      skills: ["Python", "TensorFlow", "PyTorch", "Research Design"],
      distance: 2,
    },
  },
  {
    data: {
      id: "r20",
      label: "Dr. Alan Turing",
      type: "researcher",
      institution: "Cambridge University",
      department: "Mathematics",
      skills: ["Cryptography", "Algorithms", "Artificial Intelligence"],
      distance: 5,
    },
  },

  // Skills
  {
    data: {
      id: "skill_Python",
      label: "Python",
      type: "skill",
      distance: 1,
    },
  },
  {
    data: {
      id: "skill_AI",
      label: "Artificial Intelligence",
      type: "skill",
      distance: 3,
    },
  },
  {
    data: {
      id: "skill_ControlTheory",
      label: "Control Theory",
      type: "skill",
      distance: 4,
    },
  },

  // Problems
  {
    data: {
      id: "p1",
      label: "Optimize AI Models",
      type: "problem",
      distance: 2,
    },
  },
  {
    data: {
      id: "p2",
      label: "Design Quantum Circuits",
      type: "problem",
      distance: 5,
    },
  },
  {
    data: {
      id: "p3",
      label: "Develop Autonomous Navigation",
      type: "problem",
      distance: 4,
    },
  },
  {
    data: {
      id: "p4",
      label: "Secure Cryptographic Systems",
      type: "problem",
      distance: 5,
    },
  },

  // Businesses
  {
    data: {
      id: "b1",
      label: "Tech Innovations LLC",
      type: "business",
      distance: 4,
    },
  },
  {
    data: {
      id: "b2",
      label: "Quantum Solutions Inc.",
      type: "business",
      distance: 5,
    },
  },
  {
    data: {
      id: "b3",
      label: "AI Pioneers Inc.",
      type: "business",
      distance: 3,
    },
  },
  {
    data: {
      id: "b4",
      label: "Crypto Secure Ltd.",
      type: "business",
      distance: 6,
    },
  },

  // Relationships: Skills
  {
    data: {
      source: "r3",
      target: "skill_Python",
      label: "HAS_SKILL",
      distance: 2,
    },
  },
  {
    data: {
      source: "r6",
      target: "skill_Python",
      label: "HAS_SKILL",
      distance: 3,
    },
  },
  {
    data: {
      source: "r14",
      target: "skill_Python",
      label: "HAS_SKILL",
      distance: 4,
    },
  },
  {
    data: {
      source: "r20",
      target: "skill_AI",
      label: "HAS_SKILL",
      distance: 3,
    },
  },
  {
    data: {
      source: "r15",
      target: "skill_ControlTheory",
      label: "HAS_SKILL",
      distance: 3,
    },
  },

  // New Relationships: Skills to Skills
  {
    data: {
      source: "skill_Python",
      target: "skill_AI",
      label: "SUPPORTS",
      distance: 2,
    },
  },

  // Relationships: Problems to Skills/Scientists
  {
    data: { source: "p1", target: "skill_AI", label: "REQUIRES", distance: 2 },
  },
  { data: { source: "p2", target: "r14", label: "CAN_SOLVE", distance: 3 } },
  {
    data: {
      source: "p3",
      target: "skill_ControlTheory",
      label: "REQUIRES",
      distance: 4,
    },
  },
  { data: { source: "p4", target: "r20", label: "CAN_SOLVE", distance: 5 } },

  // New Relationships: Problems to Problems
  { data: { source: "p4", target: "p2", label: "RELATED_TO", distance: 4 } },

  // Relationships: Businesses to Problems
  { data: { source: "b1", target: "p1", label: "OWNS", distance: 4 } },
  { data: { source: "b2", target: "p2", label: "OWNS", distance: 5 } },
  { data: { source: "b3", target: "p3", label: "OWNS", distance: 4 } },
  { data: { source: "b4", target: "p4", label: "OWNS", distance: 6 } },

  // New Relationships: Researchers to Skills
  {
    data: {
      source: "r15",
      target: "skill_AI",
      label: "EXPERT_IN",
      distance: 3,
    },
  },
];

export default function HERGraph() {
  const [maxDistance, setMaxDistance] = useState(1);
  const [cyInstance, setCyInstance] = useState<any>(null);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setMaxDistance(newValue as number);
  };

  // Filter nodes and their edges dynamically
  const filteredElements = (() => {
    const visibleNodes = new Set<string>();

    const visibleEdges = elements.filter((element) => {
      if (element.data?.source && element.data?.target) {
        // Include edge if it meets the maxDistance criteria
        if (element.data.distance - 1 <= maxDistance) {
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
            return edge.data("distance") * 200; // Adjust multiplier as needed
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
      <Box p={4} borderTop={"1px solid #5a755D"}>
        <Typography gutterBottom>Similarity</Typography>
        <Box p={2}>
          <Slider
            value={maxDistance}
            min={1}
            max={7} // Allow values up to 10
            step={1}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            marks={[
              { value: 1, label: "Free" },
              { value: 2, label: "Verified" },
              { value: 3, label: "Premium" },
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
