"use client";
import Loading from "@/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createUser } from "@/store/thunks/thunkUsers/thunkUsers";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);
  // useEffect(() => {
  //   dispatch(
  //     createUser({
  //       curp: "",
  //       email: "abel97_guarneros@hotmail.com",
  //       password: "secret",
  //       rfc: "",
  //       role: "SUPERADMIND",
  //       username: "El papucho boss",
  //     })
  //   );
  // }, []);

  return (
    <>
      {authUser.loading && <Loading />}
      <Grid container spacing={2} p={3}>
        {/* Button to trigger the creation modal */}
        <Grid size={12}>
          <Typography variant='h4' gutterBottom>
            Welcome, {authUser.user?.username}
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
