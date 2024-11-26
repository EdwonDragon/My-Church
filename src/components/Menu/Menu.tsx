"use client";
import { Box } from "@mui/material";
import React from "react";

import AppBarComponent from "./AppBar";
import MiniDrawer from "./CustomDrawer";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import PublicIcon from "@mui/icons-material/Public";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const menuItems = [
    {
      text: "Conferences",
      icon: <PublicIcon htmlColor='white' />,
      route: "/Conferences",
    },
    {
      text: "Módulos",
      icon: <ViewModuleIcon htmlColor='white' />,
      route: "/Modules",
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />

      <MiniDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        menuItems={menuItems}
      />
      <BreadCrumb open={open} />
    </Box>
  );
};

export default Menu;
