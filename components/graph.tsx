"use client";

import "@aws-amplify/ui-react/styles.css";

import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Typography, Slider } from "@mui/material";

const elements = [
  { data: { id: "specialNode", label: "Special Node", distance: 0 }, position: { x: 250, y: 250 } },
  { data: { id: "s1", label: "Scientist 1", distance: 1 } },
  { data: { id: "s2", label: "Scientist 2", distance: 2 } },
  { data: { id: "sk2", label: "Skill B", distance: 3 } },
  { data: { id: "p1", label: "Problem X", distance: 1 } },
  { data: { id: "b1", label: "Business Y", distance: 2 } },
  { data: { id: "b2", label: "Business Z", distance: 2 } },
  { data: { id: "s3", label: "Scientist 3", distance: 3 } },
  { data: { id: "sk3", label: "Skill C", distance: 3 } },
  { data: { id: "p2", label: "Problem Y", distance: 2 } },
  { data: { id: "sk4", label: "Skill D", distance: 4 } },

  // Edges ensuring connection to specialNode
  { data: { source: "s1", target: "specialNode", label: "HAS_SKILL", distance: 1 } }, // Scientist 1 connected
  { data: { source: "s1", target: "p1", label: "WORKS_ON", distance: 1 } }, // Problem X connected to Scientist 1
  { data: { source: "p1", target: "specialNode", label: "REQUIRES", distance: 1 } }, // Problem X connected to Special Node
  { data: { source: "s2", target: "sk2", label: "HAS_SKILL", distance: 3 } }, // Scientist 2 connected to Skill B
  { data: { source: "sk2", target: "specialNode", label: "LINKED_TO", distance: 3 } }, // Skill B connected to Special Node
  { data: { source: "s2", target: "b1", label: "COLLABORATES", distance: 2 } }, // Scientist 2 connected to Business Y
  { data: { source: "b1", target: "specialNode", label: "SUPPORTS", distance: 2 } }, // Business Y connected to Special Node
  { data: { source: "s3", target: "sk3", label: "HAS_SKILL", distance: 3 } }, // Scientist 3 connected to Skill C
  { data: { source: "sk3", target: "specialNode", label: "USED_BY", distance: 3 } }, // Skill C connected to Special Node
  { data: { source: "s3", target: "p2", label: "SOLVES", distance: 3 } }, // Scientist 3 connected to Problem Y
  { data: { source: "p2", target: "specialNode", label: "LINKED_TO", distance: 2 } }, // Problem Y connected to Special Node
  { data: { source: "b2", target: "s2", label: "WORKS_WITH", distance: 2 } }, // Business Z connected to Scientist 2
  { data: { source: "b2", target: "specialNode", label: "COLLABORATES_WITH", distance: 2 } }, // Business Z connected to Special Node
  { data: { source: "b1", target: "sk4", label: "REQUIRES", distance: 4 } }, // Business Y connected to Skill D
  { data: { source: "sk4", target: "specialNode", label: "USED_BY", distance: 4 } }, // Skill D connected to Special Node
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
      const specialNode = cyInstance.getElementById("specialNode");  
      
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
          width: "100%",
          height: "80vh",
        }}
        layout={{
          name: "cose",
          animate: true, // Enable animation
          animationDuration: 3000, // 3-second animation
          animationEasing: "ease-in-out",
          fit: true,
          padding: 30, // Add padding for a smoother layout
          randomize: false, // Disable random initial positions for nodes
          idealEdgeLength: 200, // Increase ideal edge length for smoother layout
          edgeElasticity: (edge) => {
            // Use distance to set edge elasticity
            return edge.data("distance") * 200; // Adjust multiplier as needed
                    },          nodeRepulsion: 8000, // Increase node repulsion for less overlap
          numIter: 2000, // Increase iterations for stability
        }}
        cy={(cy) => {
          setCyInstance(cy); // Store the Cytoscape instance for viewport manipulation
          cy.minZoom(0.5);
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
              "width": 60,
              "height": 60,
            },
          },
          {
            selector: "node[id = 'specialNode']",
            style: {
              "background-color": "#fafafa",
              "border-width": 4,
              "border-color": "#3391fd",
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
      <Box mt={4} p={4} px={8}>
        <Typography gutterBottom>Access Level</Typography>
        <Slider
          value={maxDistance}
          min={1}
          max={10} // Allow values up to 10
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
  );
}
