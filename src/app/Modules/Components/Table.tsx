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
import {
  deleteModule,
  fetchModules,
  fetchModulesById,
  subscribeToModulesUpdates,
} from "@/store/thunks/thunkModules/thunkModules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cleanSelectedModule } from "@/store/slices/modulesSlice/modulesSlice";

const Table = () => {
  const modules = useAppSelector((state) => state.modules);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(subscribeToModulesUpdates());
    dispatch(fetchModules());
  }, []);

  const handleClose = () => {
    dispatch(cleanSelectedModule());
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEdit = (Module: any) => {
    dispatch(fetchModulesById(Module.id));
    setOpen(true);
  };

  const handleDelete = (id: any) => {
    dispatch(deleteModule(id));
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
      {modules.loading && <Loading />}

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
            rows={modules.modules}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>

        <CustomDialog
          title={modules.selectedModule ? "Editar Módulo" : "Crear Módulo"}
          children={<Form handleClose={handleClose} setOpen={setOpen} />}
          handleClose={handleClose}
          open={open}
        />
      </Grid>
    </>
  );
};

export default Table;
