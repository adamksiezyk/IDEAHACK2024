"use client";

import "@aws-amplify/ui-react/styles.css";
import dynamic from "next/dynamic";

import React from 'react';
import CytoscapeComponent from "react-cytoscapejs";


import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Box,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import HomeIcon from "@mui/icons-material/Home";
  import CodeIcon from "@mui/icons-material/Code";
  import WorkIcon from "@mui/icons-material/Work";
  

export default function HERBar () {
  return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => 0 }}>
        <Toolbar>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {}}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
            Job Board
        </Typography>
        </Toolbar>
        </AppBar>

  );
};




