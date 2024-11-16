"use client";

import "@aws-amplify/ui-react/styles.css";

import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Slider, Typography } from "@mui/material";
import { User, AlertCircle, Book, Briefcase, HelpCircle } from "lucide-react";

const getIconBase64 = (Icon) => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${Icon.svgPaths.map((path) => `<path d="${path}" />`).join("")}
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};



const elements = [
  { data: { id: 'specialNode', label: 'Special Node', icon: User }, position: { x: 250, y: 250 } },
  { data: { id: 's1', label: 'Scientist 1', icon: User } },
  { data: { id: 's2', label: 'Scientist 2', icon: User } },
  { data: { id: 'sk2', label: 'Skill B', icon: Book } },
  { data: { id: 'p1', label: 'Problem X', icon: AlertCircle } },
  { data: { id: 'b1', label: 'Business Y', icon: Briefcase } },
  {
    data: { source: 's1', target: 'specialNode', label: 'HAS_SKILL', length: 10000, },
  },
  {
    data: { source: 's1', target: 'p1', label: 'WORKS_ON', length: 100  },
  },
  {
    data: { source: 's2', target: 'sk2', label: 'HAS_SKILL', length: 100  },
  },
  {
    data: { source: 's2', target: 'b1', label: 'COLLABORATES', length: 200  },
  },
  {
    data: { source: 'p1', target: 'specialNode', label: 'REQUIRES', length: 100  },
  },
  {
    data: { source: 's1', target: 'b1', label: 'HAS_SKILL', length: 50  },
  },
];

export default function HERGraph () {
  const [maxLength, setMaxLength] = useState(200);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setMaxLength(newValue as number);
  };

  // Filter nodes and their edges dynamically
  const filteredElements = (() => {
    const visibleNodes = new Set<string>();

    const visibleEdges = elements.filter((element) => {
      if (element.data?.source && element.data?.target) {
        // Include edge if it meets the maxLength criteria
        if (element.data.length <= maxLength) {
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


  return (
    <Box>
      {/* Graph */}
      <CytoscapeComponent
        elements={filteredElements}
        style={{
          width: "100%",
          height: "80vh",
          border: "1px solid #ccc",
        }}
        layout={{
          name: "cose", // Force-directed layout
          animate: true,
        }}
        cy={(cy) => {
          // Set zoom limits
          cy.minZoom(0.5);
          cy.maxZoom(2);
      
          // Center the viewport on the specialNode initially
          const specialNode = cy.getElementById('specialNode');
          cy.center(specialNode);
        }}
        stylesheet={[
          {
            selector: "node",
            style: {
              "background-color": "#5A9BD5",
              "text-valign": "bottom", // Place text below the node
              label: "data(label)", // Use the node's label
              "font-size": "10px",
              color: "#fff", // White text for better contrast
              "text-margin-y": 10, // Adjust label position below the node
              "background-image": "data(icon)", // Dynamically load Base64 SVG icon
              "background-fit": "cover", // Scale the icon to cover the node
              "background-opacity": 1, // Fully opaque icon
              "border-width": 2,
              "border-color": "#333333",
              "width": 60,
              "height": 60,
              shape: "ellipse",
            },
          },
          {
            selector: "node[id = 'specialNode']",
            style: {
              "background-color": "#FF4136",
              "border-width": 4,
              "border-color": "#FFDC00",
              "border-style": "solid",
              "width": 80,
              "height": 80,
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
      <Box mt={4} px={2}>
        <Typography gutterBottom>Max Edge Length: {maxLength}</Typography>
        <Slider
          value={maxLength}
          min={100}
          max={300}
          step={10}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          marks={[
            { value: 100, label: "100" },
            { value: 200, label: "200" },
            { value: 300, label: "300" },
          ]}
        />
      </Box>
    </Box>
  );
};

