"use client";

import "@aws-amplify/ui-react/styles.css";
import dynamic from "next/dynamic";

import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import { Box, Typography } from "@mui/material";



export default function HERGraph () {
  // Sample graph data: nodes and edges
  const elements = [
    { data: { id: 's1', label: 'Scientist 1' } },
    { data: { id: 's2', label: 'Scientist 2' } },
    { data: { id: 'sk1', label: 'Skill A' } },
    { data: { id: 'sk2', label: 'Skill B' } },
    { data: { id: 'p1', label: 'Problem X' } },
    { data: { id: 'b1', label: 'Business Y' } },
    {
      data: { source: 's1', target: 'sk1', label: 'HAS_SKILL' },
    },
    {
      data: { source: 's1', target: 'p1', label: 'WORKS_ON' },
    },
    {
      data: { source: 's2', target: 'sk2', label: 'HAS_SKILL' },
    },
    {
      data: { source: 's2', target: 'b1', label: 'COLLABORATES' },
    },
    {
      data: { source: 'p1', target: 'sk1', label: 'REQUIRES' },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        backgroundColor: "#333333", // Placeholder background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
      }}
    >
<div>
      <h1 style={{ textAlign: 'center' }}>Graph Visualization</h1>
      <CytoscapeComponent
        elements={elements}
        style={{
          width: '100%',
          height: '80vh',
          border: '1px solid #ccc',
        }}
        layout={{
          name: 'cose', // Force-directed layout
        }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              'background-color': '#0074D9',
              label: 'data(label)',
              color: '#fff',
              'text-valign': 'center',
              'text-outline-width': 2,
              'text-outline-color': '#0074D9',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 2,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              label: 'data(label)',
              'font-size': '10px',
              'text-rotation': 'autorotate',
              'text-margin-y': -10,
              color: '#000',
            },
          },
        ]}
      />
    </div>
    </Box>    
  );
};

