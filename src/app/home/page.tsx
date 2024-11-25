"use client";
import Loading from "@/components/Loading/Loading";
import { useAppSelector } from "@/store/hooks";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
const Home = () => {
  const globalState = useAppSelector((state) => state.user);

  return (
    <>
      {globalState.isLoading && <Loading />}
      <Grid container spacing={2} p={3}>
        {/* Button to trigger the creation modal */}
        <Grid size={12}>
          <Typography variant='h4' gutterBottom>
            Welcome, {globalState.user?.username}
          </Typography>
          <Button variant='contained' color='secondary'>
            Hisdf
          </Button>
          <Button variant='contained' color='primary'>
            Hisdf
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
