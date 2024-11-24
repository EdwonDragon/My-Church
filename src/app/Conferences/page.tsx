import { Typography } from "@mui/material";
import Table from "./Components/Table";
import PublicIcon from "@mui/icons-material/Public";
import Grid from "@mui/material/Grid2";
const Conferences = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant='h1' align='center'>
            <PublicIcon /> Listado de conferencias
          </Typography>
        </Grid>
        <Grid size={12}>
          <Table />
        </Grid>
      </Grid>
    </>
  );
};

export default Conferences;
