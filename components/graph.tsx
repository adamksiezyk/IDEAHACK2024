"use client";

import "@aws-amplify/ui-react/styles.css";

import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Typography, Slider } from "@mui/material";
import { downloadData } from 'aws-amplify/storage';
import { json } from "stream/consumers";

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
    // The provided `nodes` array
  ],
  "links": [
    // The provided `links` array
  ]
};


export default function HERGraph() {
  const [maxDistance, setMaxDistance] = useState(1);
  const [cyInstance, setCyInstance] = useState<any>(null);


     const result = downloadData({
      path: "graphs/realistic_data.json",
      options: {
        // Specify a target bucket using name assigned in Amplify Backend
        bucket: "graph_json_storage"
      }
    }).result;


  const elements = transformGraph(result);

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
