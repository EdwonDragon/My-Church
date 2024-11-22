"use client";
import { useAppSelector } from "@/store/hooks";
import { Container, Typography, CircularProgress, Button } from "@mui/material";

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
          <Typography variant='h4' gutterBottom>
            Welcome, {globalState.user?.username}
          </Typography>
          <Button variant='contained' color='secondary'>
            Hisdf
          </Button>
          <Button variant='contained' color='primary'>
            Hisdf
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Home;
