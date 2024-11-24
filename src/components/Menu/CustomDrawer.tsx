"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";

// Drawer width
const drawerWidth = 240;

// Mixin for the drawer when it's open
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Mixin for the drawer when it's closed
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer header styling
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Main Drawer component styling
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: { open: true },
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: { open: false },
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

// Define the TypeScript interface for the component props
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  route: string; // Added route for routing logic
}

interface MiniDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  menuItems: MenuItem[];
}

// Main component to render the drawer and app bar
const MiniDrawer = ({
  open,
  handleDrawerClose,
  menuItems,
}: MiniDrawerProps) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} aria-label='close drawer'>
            {theme.direction !== "rtl" && <ChevronLeftIcon htmlColor='white' />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Drawer menu */}
        <List>
          {menuItems.map(({ text, icon, route }, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
                onClick={() => router.push(route)} // Use dynamic routing
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    color: "white !important", // Forzar el color blanco
                    opacity: open ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default MiniDrawer;
