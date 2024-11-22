"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "./theme";

const Themes = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Themes;
