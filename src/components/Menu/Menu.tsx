"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import AppBarComponent from "./AppBar";
import MiniDrawer from "./CustomDrawer";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import PublicIcon from "@mui/icons-material/Public";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { useAppSelector } from "@/store/hooks";
const Menu = () => {
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const globalState = useAppSelector((state) => state.user);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    if (!globalState.user?.role) {
      setMenuItems([
        {
          text: "Zonas",
          icon: <PublicIcon htmlColor='white' />,
          route: "/Zones",
        },
        {
          text: "Módulos",
          icon: <ViewModuleIcon htmlColor='white' />,
          route: "/Modules",
        },
        {
          text: "Usuarios",
          icon: <AccessibilityNewIcon htmlColor='white' />,
          route: "/Users",
        },
      ]);
    }
  }, []);

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
