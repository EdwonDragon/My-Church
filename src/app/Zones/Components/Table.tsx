"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Form from "./Form";
import CustomDialog from "@/components/CustomDialog/CustomDialog";
import DeleteAction from "@/components/ActionsDataGrid/DeleteAction";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Loading from "@/components/Loading/Loading";
import Owners from "./Owners";
import {
  deleteZone,
  fetchZoneById,
  fetchZones,
  subscribeToZoneUpdates,
} from "@/store/Thunks/ThunksZones/Thunk";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cleanSelectedZone } from "@/store/slices/zonesSlice/zonesSlice";

const Table = () => {
  const zones = useAppSelector((state) => state.zones);
  const [open, setOpen] = useState(false);
  const [openOwner, setOpenOwner] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(subscribeToZoneUpdates());
    dispatch(fetchZones());
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenOnwer = async (Zone: any) => {
    const { data: owner } = await Zone.owner();
    setSelectedOwner(owner);
    setOpenOwner(true);
  };

  const handleCloseOnwer = () => {
    setOpenOwner(false);
  };

  const handleOpen = () => {
    dispatch(cleanSelectedZone());
    setOpen(true);
  };

  const handleEdit = (Zone: any) => {
    dispatch(fetchZoneById(Zone.id));
    setOpen(true);
  };

  const handleDelete = (id: any) => {
    dispatch(deleteZone(id));
  };
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "location", headerName: "Ubicación", flex: 1 },

    { field: "logo", headerName: "logo", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            title={"Editar zone"}
            onClick={() => handleEdit(params.row)}
            aria-label='Editar'
            size='large'
          >
            <EditIcon color='primary' />
          </IconButton>

          <DeleteAction id={params.row.id} onDelete={handleDelete} />
          <IconButton
            title={"Agregar propietario"}
            onClick={() => handleOpenOnwer(params.row)}
            aria-label='Agregar'
            size='large'
          >
            <AccessibilityIcon color='primary' />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      {zones.loading && <Loading />}

      <Grid container spacing={2} p={3}>
        <Grid size={12}>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleOpen}
            sx={{ marginBottom: 2 }}
            startIcon={<AddCircleOutlineIcon />}
          >
            Crear Zona
          </Button>
        </Grid>

        <Grid size={12}>
          <DataGrid
            rows={zones.zones}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        <CustomDialog
          title={zones.selectedZone ? "Editar zona" : "Crear zona"}
          children={
            <Form handleClose={handleClose} setOpen={setOpen} open={open} />
          }
          setOpen={setOpen}
          open={open}
        />

        <CustomDialog
          title={selectedOwner ? "Editar propietario" : "Crear propietario"}
          children={
            <Owners
              selectedOwner={selectedOwner}
              handleCloseOnwer={handleCloseOnwer}
              setOpen={setOpenOwner}
              open={openOwner}
            />
          }
          setOpen={setOpenOwner}
          open={openOwner}
        />
      </Grid>
    </>
  );
};

export default Table;
