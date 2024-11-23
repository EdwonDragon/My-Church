"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";

// Genera el cliente utilizando el esquema
const client = generateClient<Schema>();

const Conferences = () => {
  const [conferences, setConferences] = useState<any[]>([]); // Conferencias cargadas
  const [open, setOpen] = useState(false); // Modal abierto
  const [selectedConference, setSelectedConference] = useState<any | null>(
    null
  ); // Conferencia seleccionada para editar

  const { handleSubmit, control, reset } = useForm(); // React Hook Form

  // Cargar conferencias al montar
  useEffect(() => {
    const fetchConferences = async () => {
      const { data } = await client.models.Conference.list();
      setConferences(data);
    };
    fetchConferences();
  }, []);

  // Crear o actualizar conferencia
  const onSubmit = async (data: any) => {
    if (selectedConference) {
      // Actualización
      await client.models.Conference.update({
        id: selectedConference.id,
        ...data,
      });
    } else {
      // Creación
      const ddd = await client.models.Conference.create(data);
      console.log(ddd);
    }

    // Actualiza la lista de conferencias
    const { data: updatedConferences } = await client.models.Conference.list();
    setConferences(updatedConferences);
    handleClose(); // Cerrar modal
  };

  // Cerrar modal
  const handleClose = () => {
    setOpen(false); // Cerrar modal
    reset(); // Limpiar el formulario
  };
  // Abrir modal para crear conferencia
  const handleOpen = () => {
    setSelectedConference(null); // Restablecer conferencia seleccionada
    reset(); // Resetear formulario
    setOpen(true);
  };

  // Abrir modal para editar conferencia
  const handleEdit = (conference: any) => {
    setSelectedConference(conference);
    reset(conference); // Cargar datos en el formulario
    setOpen(true);
  };

  // Eliminar conferencia
  const handleDelete = async (id: string) => {
    await client.models.Conference.delete({ id });
    const { data: updatedConferences } = await client.models.Conference.list();
    setConferences(updatedConferences);
  };

  // Columnas de DataGrid
  const columns = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "location", headerName: "Ubicación", width: 150 },
    { field: "date", headerName: "Fecha", width: 150 },
    { field: "description", headerName: "Descripción", width: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params: any) => (
        <>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Crear Conferencia
      </Button>

      <div style={{ height: 400, width: "100%", marginTop: 20 }}>
        <DataGrid rows={conferences} columns={columns} />
      </div>

      {/* Modal para crear/editar conferencia */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {selectedConference ? "Editar Conferencia" : "Crear Conferencia"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Nombre'
                  fullWidth
                  margin='normal'
                  required
                />
              )}
            />
            <Controller
              name='location'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Ubicación'
                  fullWidth
                  margin='normal'
                  required
                />
              )}
            />
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Fecha'
                  type='date'
                  fullWidth
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                  required
                />
              )}
            />
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Descripción'
                  fullWidth
                  margin='normal'
                />
              )}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} color='primary'>
                Cancelar
              </Button>
              <Button type='submit' color='primary'>
                {selectedConference ? "Actualizar" : "Crear"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Conferences;
