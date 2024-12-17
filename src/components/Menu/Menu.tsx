"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBarComponent from "./AppBar";
import MiniDrawer from "./CustomDrawer";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import PublicIcon from "@mui/icons-material/Public";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useAppSelector } from "@/store/hooks";
const Menu = () => {
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const authUser = useAppSelector((state) => state.authUser);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    if (authUser.user) {
      if (authUser.user.role !== "SUPERADMIND") {
        setMenuItems(
          [
            {
              text: "Zonas",
              icon: <PublicIcon htmlColor='white' />,
              route: "/Zones",
            },
            {
              text: "Usuarios",
              icon: <PersonAddAltIcon htmlColor='white' />,
              route: "/Users",
            },
            {
              text: "Departamentos",
              icon: <HomeWorkIcon htmlColor='white' />,
              route: "/Departments",
            },
          ].filter((item) => authUser.permissions.includes(item.route))
        );
      } else if (authUser.user.role === "SUPERADMIND") {
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
        ]);
      }
    }
  }, [authUser]);

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
