import React from "react";
import { Typography, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          position: "relative",
          p: 2,
          px: 4,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component='img'
          src='/logo-def.png'
          alt='Loading logo'
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            animation: "loading-animation 2s infinite",
          }}
        />
        <Typography
          variant='h6'
          color='white'
          sx={{
            mt: 2,
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Cargando...
        </Typography>
      </Box>
      <style>
        {`
          @keyframes loading-animation {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Loading;
