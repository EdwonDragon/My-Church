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
import { showAlert } from "@/components/SweetAlert/Alert";
import { client } from "@/helpers/Client";
import Owners from "./Owners";
import { CheckErrors } from "@/helpers/CheckErrors";

const Table = () => {
  const [zones, setZones] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any | null>(null);
  const [openOwner, setOpenOwner] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = client.models.Zone.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        setZones([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const fetchZones = async () => {
    setLoading(true);
    try {
      let allZones: any[] = [];
      let nextToken: string | null = null;

      do {
        const rawResponse = await client.models.Zone.list({
          nextToken,
        });

        const response: { data: any[]; nextToken: string | null } = {
          data: rawResponse.data,
          nextToken: rawResponse.nextToken || null, // Convertimos undefined a null
        };

        allZones = [...allZones, ...response.data];
        nextToken = response.nextToken;
      } while (nextToken); // Continúa mientras haya un nextToken

      setZones(allZones);
    } catch (error) {
      setLoading(false);
      showAlert({
        title: "¡Error!",
        message: "Hubo un problema al cargar las zones.",
        type: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchZones();
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
    setSelectedZone(null);
    setOpen(true);
  };

  const handleEdit = (Zone: any) => {
    setSelectedZone(Zone);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const deleteData = await client.models.Zone.delete({ id });

      await CheckErrors(deleteData);
      setLoading(false);

      showAlert({
        title: "¡Éxito!",
        message: "La zone se eliminó correctamente.",
        type: "success",
      });
    } catch (error: any) {
      setLoading(false);

      showAlert({
        title: "¡Error!",
        message: error,
        type: "warning",
      });
    }
  };

  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "location", headerName: "Ubicación", flex: 1 },

    // { field: "logo", headerName: "logo", flex: 1 },
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
      {loading && <Loading />}

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
            rows={zones}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        <CustomDialog
          title={selectedZone ? "Editar zona" : "Crear zona"}
          children={
            <Form
              selectedZone={selectedZone}
              handleClose={handleClose}
              setOpen={setOpen}
              open={open}
            />
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
