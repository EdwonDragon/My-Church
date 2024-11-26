"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import Form from "./Form"; // El formulario para crear/editar módulos
import Modal from "@/components/Dialog/Dialog";
import DeleteAction from "@/components/ActionsDataGrid/DeleteAction";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Loading from "@/components/Loading/Loading";
import { showAlert } from "@/components/SweetAlert/Alert";

// Generar cliente utilizando el esquema
const client = generateClient<Schema>();

const Table = () => {
  const [modules, setModules] = useState<any[]>([]); // Módulos cargados
  const [open, setOpen] = useState(false); // Modal abierto
  const [selectedModule, setSelectedModule] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar los módulos desde la API
  const fetchModules = async () => {
    const { data } = await client.models.Modules.list();
    setModules(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchModules();
  }, []);

  // Cerrar modal
  const handleClose = () => {
    setOpen(false); // Cerrar modal
  };

  // Abrir modal para crear módulo
  const handleOpen = () => {
    setSelectedModule(null); // Restablecer módulo seleccionado
    setOpen(true);
  };

  // Abrir modal para editar módulo
  const handleEdit = (module: any) => {
    setSelectedModule(module);
    setOpen(true);
  };

  // Eliminar módulo
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      // Intentar eliminar el módulo
      await client.models.Modules.delete({ id });

      // Obtener la lista actualizada de módulos
      const { data: updatedModules } = await client.models.Modules.list();
      setModules(updatedModules);
      setLoading(false);
      // Mostrar alerta de éxito
      showAlert({
        title: "¡Éxito!",
        message: "El módulo se eliminó correctamente.",
        type: "success",
      });
    } catch (error) {
      setLoading(false);
      // Mostrar alerta de error
      showAlert({
        title: "¡Error!",
        message: "Hubo un problema al eliminar el módulo.",
        type: "warning",
      });
    }
  };

  // Columnas de DataGrid
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "route", headerName: "Ruta", flex: 1 },

    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            title={"Editar módulo"}
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
        {/* Botón para abrir el modal de creación */}
        <Grid size={12}>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleOpen}
            sx={{ marginBottom: 2 }}
            startIcon={<AddCircleOutlineIcon />}
          >
            Crear Módulo
          </Button>
        </Grid>

        {/* DataGrid para mostrar los módulos */}
        <Grid size={12}>
          <DataGrid
            rows={modules}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        {/* Modal para crear o editar módulo */}
        <Modal
          title={selectedModule ? "Editar Módulo" : "Crear Módulo"}
          children={
            <Form
              selectedModule={selectedModule}
              setModules={setModules}
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
