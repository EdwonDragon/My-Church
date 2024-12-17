"use client";
import Loading from "@/components/Loading/Loading";
import { useAppSelector } from "@/store/hooks";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
const Home = () => {
  const authUser = useAppSelector((state) => state.authUser);

  return (
    <>
      {authUser.loading && <Loading />}
      <Grid container spacing={2} p={3}>
        <Grid size={12}>
          <Typography variant='h4' gutterBottom>
            Welcome, {authUser.user?.username}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
