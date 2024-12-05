"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Form from "./Form";
import CustomDialog from "@/components/CustomDialog/CustomDialog";
import DeleteAction from "@/components/ActionsDataGrid/DeleteAction";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Loading from "@/components/Loading/Loading";

import {
  deleteZone,
  fetchZoneById,
  subscribeToZoneUpdates,
} from "@/store/thunks/thunkZones/thunkZones";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cleanSelectedZone } from "@/store/slices/zonesSlice/zonesSlice";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import EditAction from "@/components/ActionsDataGrid/EditAction";
import { fetchUserById } from "@/store/thunks/thunkUsers/thunkUsers";
import { cleanSelectedUser } from "@/store/slices/usersSilce/usersSlice";
import Owners from "@/app/Owners/page";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Table = () => {
  const zones = useAppSelector((state) => state.zones);
  const owner = useAppSelector((state) => state.users);
  const authUser = useAppSelector((state) => state.authUser);
  const [open, setOpen] = useState(false);
  const [openOwner, setOpenOwner] = useState(false);
  const dispatch = useAppDispatch();

  const getData = async () => {
    if (authUser.user) {
      const { data: zone } = await authUser.user.zoneOwner();
      if (authUser.user.role == "SUPERADMIND") {
        dispatch(subscribeToZoneUpdates("Conference"));
      } else {
        dispatch(
          subscribeToZoneUpdates(
            zone.type == "Conference" ? "District" : "Church"
          )
        );
      }
    }
  };
  useEffect(() => {
    if (authUser.user) {
      getData();
    }
  }, [authUser.user]);

  const handleOpenOnwer = async (Zone: any) => {
    const { data: owner } = await Zone.owner();
    dispatch(fetchZoneById(Zone.id));
    dispatch(fetchUserById(owner?.id));
    setOpenOwner(true);
  };

  const handleCloseOnwer = () => {
    dispatch(cleanSelectedUser());
    setOpenOwner(false);
  };
  const handleClose = () => {
    dispatch(cleanSelectedZone());
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    dispatch(fetchZoneById(id));
    setOpen(true);
  };

  const handleDelete = (id: any) => {
    dispatch(deleteZone(id));
  };
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "location", headerName: "Ubicación", flex: 1 },

    {
      field: "logo",
      headerName: "Logo",
      flex: 1,

      renderCell: (params: any) => (
        <>
          <StorageImage
            width={50}
            height={50}
            alt='logo'
            path={`${params.value[0]}`}
          />
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <EditAction handleEdit={handleEdit} id={params.row.id} />
          <DeleteAction onDelete={handleDelete} id={params.row.id} />
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
          children={<Form handleClose={handleClose} setOpen={setOpen} />}
          handleClose={handleClose}
          open={open}
        />

        <CustomDialog
          title={
            owner.selectedUser ? "Editar propietario" : "Crear propietario"
          }
          children={
            <Owners
              handleClose={handleCloseOnwer}
              setOpen={setOpenOwner}
              role={"OWNER"}
            />
          }
          handleClose={handleCloseOnwer}
          open={openOwner}
        />
      </Grid>
    </>
  );
};

export default Table;
