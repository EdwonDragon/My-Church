"use client";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { Box, Card, CardContent, Typography } from "@mui/material"; // Material UI components

Amplify.configure(outputs);

const Authenticators = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Authenticator hideSignUp={true}>{children}</Authenticator>
    </Box>
  );
};

export default Authenticators;
