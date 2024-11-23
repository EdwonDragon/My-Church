"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GrainIcon from "@mui/icons-material/Grain";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface BreadCrumProps {
  open: boolean; // Controls the Drawer state
}

const BreadCrumb = ({ open }: BreadCrumProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Map of routes to names
  const routeNames: { [key: string]: string } = {
    "/": "Inicio",
    "/home": "Inicio",
    "/home/": "Inicio",
    "/Conferences": "Conferencias",
  };

  // Get the current page name from the route
  const getCurrentPageName = () => {
    for (const route in routeNames) {
      const routeRegex = new RegExp(`^${route.replace(/:[^/]+/g, "([^/]+)")}$`);
      if (routeRegex.test(pathname)) {
        return routeNames[route];
      }
    }
    return "Unknown"; // Default if no route is found
  };

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{
        position: "fixed",
        top: 70,
        left: open ? "240px" : "70px", // Adjust this based on the width of your Drawer
        width: "100%",
        padding: "8px 16px", // Adjust padding if needed
        zIndex: 1100, // Ensure it's above other content
        transition: "left 0.3s ease", // Transition for smooth movement of the left property
      }}
    >
      {/* Home link */}
      <Link
        href='/'
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
        <Typography
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
          }}
        >
          {"Inicio"}
        </Typography>
      </Link>

      {/* Back button */}
      <div
        onClick={() => router.back()}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <ArrowBackIcon sx={{ mr: 0.5 }} fontSize='inherit' />
        <Typography
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
          }}
        >
          {"Atras"}
        </Typography>
      </div>

      {/* Current page */}
      <Typography
        sx={{
          color: "text.primary",
          display: "flex",
          alignItems: "center",
        }}
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
        {getCurrentPageName()}
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadCrumb;
