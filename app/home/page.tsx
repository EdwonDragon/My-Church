"use client";
import { useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";

import { useAppSelector } from "@/app/store/hooks";

const Home = () => {
  const globalState = useAppSelector((state) => state.user);

  if (globalState.isLoading) {
    return <CircularProgress />; 
  }

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      {globalState.isLoading ? (
        <CircularProgress /> 
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>
            Bienvenido, {globalState.user?.username}
          </Typography>
          
        </div>
      )}
    </Container>
  );
};

export default Home;
