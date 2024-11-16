"use client";

import "@aws-amplify/ui-react/styles.css";

import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Slider, Typography } from "@mui/material";

const elements = [
  { data: { id: "specialNode", label: "Special Node", distance: 0 }, position: { x: 250, y: 250 } },
  { data: { id: "s1", label: "Scientist 1", distance: 1 } },
  { data: { id: "s2", label: "Scientist 2", distance: 2 } },
  { data: { id: "sk2", label: "Skill B", distance: 3 } },
  { data: { id: "p1", label: "Problem X", distance: 1 } },
  { data: { id: "b1", label: "Business Y", distance: 2 } },
  { data: { source: "s1", target: "specialNode", label: "HAS_SKILL", distance: 1 } },
  { data: { source: "s1", target: "p1", label: "WORKS_ON", distance: 1 } },
  { data: { source: "s2", target: "sk2", label: "HAS_SKILL", distance: 3 } },
  { data: { source: "s2", target: "b1", label: "COLLABORATES", distance: 2 } },
  { data: { source: "p1", target: "specialNode", label: "REQUIRES", distance: 1 } },
  { data: { source: "s1", target: "b1", label: "HAS_SKILL", distance: 2 } },
];

export default function HERGraph() {
  const [maxDistance, setMaxDistance] = useState(2);
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
          width: "1000px",
          height: "80vh",
          border: "1px solid #ccc",
        }}
        layout={{
          name: "cose", // Force-directed layout
          animate: true,
          animationDuration: 3000, // Slower animation (2 seconds)
          animationEasing: "ease-in-out", // Smooth easing
          edgeElasticity: (edge) => {
            // Use distance to set edge elasticity
            return edge.data("distance") * 30; // Adjust multiplier as needed
          },
          randomize: false, // Disable random initial positions for nodes
          idealEdgeLength: 100, // Increase ideal edge length for smoother layout
          nodeRepulsion: 160, // Increase node repulsion for less overlap
          numIter: 500, // Increase iterations for stability

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
      <Box mt={4} px={2}>
        <Typography gutterBottom>Max Distance: {maxDistance}</Typography>
        <Slider
          value={maxDistance}
          min={1}
          max={3}
          step={1}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          marks={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
          ]}
        />
      </Box>
    </Box>
  );
}
