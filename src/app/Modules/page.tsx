import { Typography } from "@mui/material";
import Table from "./Components/Table";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Grid from "@mui/material/Grid2";
const Conferences = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant='h1' align='center'>
            <ViewModuleIcon /> Listado de módulos
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
