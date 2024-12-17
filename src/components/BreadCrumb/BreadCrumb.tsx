"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GrainIcon from "@mui/icons-material/Grain";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

interface BreadCrumProps {
  open: boolean;
}

const BreadCrumb = ({ open }: BreadCrumProps) => {
  const authUser = useAppSelector((state) => state.authUser);
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentPageName = () => {
    for (const route in authUser.routeNames) {
      const routeRegex = new RegExp(`^${route.replace(/:[^/]+/g, "([^/]+)")}$`);
      if (routeRegex.test(pathname)) {
        return authUser.routeNames[route];
      }
    }
    return "Unknown";
  };

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{
        position: "fixed",
        top: 70,
        left: open ? "240px" : "70px",
        width: "100%",
        padding: "8px 16px",
        zIndex: 1100,
        transition: "left 0.3s ease",
      }}
    >
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
