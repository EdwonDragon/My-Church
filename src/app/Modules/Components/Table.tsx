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
import Loading from "@/components/Loading/Loading";
import { showAlert } from "@/components/SweetAlert/Alert";
import { client } from "@/helpers/Client";
import { CheckErrors } from "@/helpers/CheckErrors";

const Table = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = client.models.Modules.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        setModules([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const fetchModules = async () => {
    setLoading(true);
    try {
      let allModules: any[] = [];
      let nextToken: string | null = null;

      do {
        const rawResponse = await client.models.Modules.list({
          nextToken,
        });
        const response: { data: any[]; nextToken: string | null } = {
          data: rawResponse.data,
          nextToken: rawResponse.nextToken || null,
        };

        await CheckErrors(response);

        allModules = [...allModules, ...response.data];
        nextToken = response.nextToken;
      } while (nextToken);

      const enrichedModules = await Promise.all(
        allModules.map(async (module) => {
          const enrichedModule: any = { ...module };

          if (module.conference) {
            const { data: conferenceData } = await module.conference();
            enrichedModule.conferenceData = conferenceData;
          }

          if (module.district) {
            const { data: districtData } = await module.district();
            enrichedModule.districtData = districtData;
          }

          return enrichedModule;
        })
      );

      setModules(enrichedModules);
    } catch (error: any) {
      showAlert({
        title: "¡Error!",
        message: error,
        type: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchModules();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setSelectedModule(null);
    setOpen(true);
  };

  const handleEdit = (module: any) => {
    setSelectedModule(module);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const deleteData = await client.models.Modules.delete({ id });
      await CheckErrors(deleteData);

      setLoading(false);

      showAlert({
        title: "¡Éxito!",
        message: "El módulo se eliminó correctamente.",
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
    { field: "route", headerName: "Ruta", flex: 1 },

    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params: any) => {
        return (
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
        );
      },
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
            Crear Módulo
          </Button>
        </Grid>

        <Grid size={12}>
          <DataGrid
            rows={modules}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        <CustomDialog
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
