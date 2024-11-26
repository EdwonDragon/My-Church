"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import { Button, DialogActions, TextField, Typography } from "@mui/material";
import { validateAlphanumeric } from "@/validators";
import { showAlert } from "@/components/SweetAlert/Alert";
import Loading from "@/components/Loading/Loading";

const client = generateClient<Schema>();
interface FormProps {
  selectedConference: Record<string, any>;
  setConferences: React.Dispatch<React.SetStateAction<any[]>>;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}
const Form = ({
  selectedConference,
  setConferences,
  handleClose,
  setOpen,
  open,
}: FormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", location: "", logo: "" },
  });

  const [loading, setLoading] = useState(true);
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (selectedConference) {
        await client.models.Conference.update({
          id: selectedConference.id,
          ...data,
        });
      } else {
        await client.models.Conference.create(data);
      }

      const { data: updatedConferences } =
        await client.models.Conference.list();
      setConferences(updatedConferences);

      handleClose();
      setLoading(false);
      showAlert({
        title: "¡Éxito!",
        message: "Los datos se guardaron correctamente.",
        type: "success",
      });
    } catch (error) {
      setLoading(false);
      handleClose();
      showAlert({
        title: "¡Error!",
        message: "Hubo un problema al guardar los datos.",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (selectedConference) {
      reset({
        logo: selectedConference.logo,
        location: selectedConference.location,
        name: selectedConference.name,
      });
    }
    setLoading(false);
  }, [open]);

  return (
    <>
      {loading && <Loading />}
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("name", validateAlphanumeric("Nombre"))}
            label={"Nombre"}
            fullWidth
            helperText={errors.name?.message}
            error={!!errors.name}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("location", validateAlphanumeric("Ubicacion"))}
            label={"Ubicacion"}
            fullWidth
            helperText={errors.location?.message}
            error={!!errors.location}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("logo", validateAlphanumeric("Logo"))}
            label={"Logo"}
            fullWidth
            helperText={errors.logo?.message}
            error={!!errors.logo}
          />
        </Grid>
        <Grid size={12}>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color='secondary'>
              Cancelar
            </Button>
            <Button onClick={handleSubmit(onSubmit)} color='primary'>
              {selectedConference ? "Actualizar" : "Crear"}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
