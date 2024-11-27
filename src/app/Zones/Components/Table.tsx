"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import Form from "./Form";
import Modal from "@/components/Dialog/Dialog";
import DeleteAction from "@/components/ActionsDataGrid/DeleteAction";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Loading from "@/components/Loading/Loading";
import { showAlert } from "@/components/SweetAlert/Alert";

const client = generateClient<Schema>();

const Table = () => {
  const [zone, setZones] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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
      await client.models.Zone.delete({ id });

      const { data: updatedZones } = await client.models.Zone.list();
      setZones(updatedZones);
      setLoading(false);

      showAlert({
        title: "¡Éxito!",
        message: "La zone se eliminó correctamente.",
        type: "success",
      });
    } catch (error) {
      setLoading(false);

      showAlert({
        title: "¡Error!",
        message: "Hubo un problema al eliminar la zone.",
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
        </>
      ),
    },
  ];

  return (
    <>
      {loading && <Loading />}

      <Grid container spacing={2} p={3}>
        {/* Button to trigger the creation modal */}
        <Grid size={12}>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleOpen}
            sx={{ marginBottom: 2 }}
            startIcon={<AddCircleOutlineIcon />}
          >
            Crear zone
          </Button>
        </Grid>

        {/* DataGrid with full width */}
        <Grid size={12}>
          <DataGrid
            rows={zone}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        {/* Modal to create or edit Zone */}
        <Modal
          title={selectedZone ? "Editar zone" : "Crear zone"}
          children={
            <Form
              selectedZone={selectedZone}
              setZones={setZones}
              handleClose={handleClose}
              setOpen={setOpen}
              open={open}
            />
          }
          setOpen={setOpen}
          open={open}
        />
      </Grid>
    </>
  );
};

export default Table;
