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

// Genera el cliente utilizando el esquema
const client = generateClient<Schema>();

const Table = () => {
  const [conferences, setConferences] = useState<any[]>([]); // Conferencias cargadas
  const [open, setOpen] = useState(false); // Modal abierto
  const [selectedConference, setSelectedConference] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchConferences = async () => {
    const { data } = await client.models.Conference.list();
    setConferences(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchConferences();
  }, []);

  // Cerrar modal
  const handleClose = () => {
    setOpen(false); // Cerrar modal
  };

  // Abrir modal para crear conferencia
  const handleOpen = () => {
    setSelectedConference(null); // Restablecer conferencia seleccionada
    setOpen(true);
  };

  // Abrir modal para editar conferencia
  const handleEdit = (conference: any) => {
    setSelectedConference(conference);
    setOpen(true);
  };

  // Eliminar conferencia
  const handleDelete = async (id: string) => {
    try {
      // Intentar eliminar la conferencia
      await client.models.Conference.delete({ id });

      // Obtener la lista actualizada de conferencias
      const { data: updatedConferences } =
        await client.models.Conference.list();
      setConferences(updatedConferences);

      // Mostrar alerta de éxito
      showAlert({
        title: "¡Éxito!",
        message: "La conferencia se eliminó correctamente.",
        type: "success",
      });
    } catch (error) {
      // Mostrar alerta de error
      showAlert({
        title: "¡Error!",
        message: "Hubo un problema al eliminar la conferencia.",
        type: "warning",
      });
    }
  };

  // Columnas de DataGrid
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "location", headerName: "Ubicación", flex: 1 },

    { field: "description", headerName: "Descripción", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            title={"Editar conferencia"}
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
            Crear Conferencia
          </Button>
        </Grid>

        {/* DataGrid with full width */}
        <Grid size={12}>
          <DataGrid
            rows={conferences}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        {/* Modal to create or edit conference */}
        <Modal
          title={
            selectedConference ? "Editar Conferencia" : "Crear Conferencia"
          }
          children={
            <Form
              selectedConference={selectedConference}
              setConferences={setConferences}
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
