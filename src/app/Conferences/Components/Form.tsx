"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import { Button, DialogActions, TextField, Typography } from "@mui/material";
import { validateAlphanumeric } from "@/validators";

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
    defaultValues: { name: "", location: "", description: "" },
  });
  const onSubmit = async (data: any) => {
    if (selectedConference) {
      await client.models.Conference.update({
        id: selectedConference.id,
        ...data,
      });
    } else {
      await client.models.Conference.create(data);
    }

    const { data: updatedConferences } = await client.models.Conference.list();
    setConferences(updatedConferences);
    handleClose();
  };
  useEffect(() => {
    if (selectedConference) {
      reset({
        description: selectedConference.description,
        location: selectedConference.location,
        name: selectedConference.name,
      });
    }
  }, [open]);

  return (
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
          {...register("description", validateAlphanumeric("Descripción"))}
          label={"Descripción"}
          fullWidth
          helperText={errors.description?.message}
          error={!!errors.description}
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
  );
};

export default Form;
