"use client";
import { Box } from "@mui/material";
import React from "react";
import AppBarComponent from "./AppBar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MiniDrawer from "./CustomDrawer";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const menuItems = [{ text: "Home", icon: <InboxIcon />, route: "/home" }];
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
