"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import {
  Autocomplete,
  Button,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { validateAlphanumeric, validateSelects } from "@/validators";
import { showAlert } from "@/components/SweetAlert/Alert";
import Loading from "@/components/Loading/Loading";
import types from "../Helpers/types.json";
const client = generateClient<Schema>();
interface FormProps {
  selectedZone: Record<string, any>;
  setZones: React.Dispatch<React.SetStateAction<any[]>>;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}
const Form = ({
  selectedZone,
  setZones,
  handleClose,
  setOpen,
  open,
}: FormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", location: "", logo: "", type: "" },
  });

  const [loading, setLoading] = useState(true);
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (selectedZone) {
        await client.models.Zone.update({
          id: selectedZone.id,
          ...data,
        });
      } else {
        await client.models.Zone.create(data);
      }

      const { data: updatedZones } = await client.models.Zone.list();
      setZones(updatedZones);

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
    if (selectedZone) {
      reset({
        logo: selectedZone.logo,
        location: selectedZone.location,
        name: selectedZone.name,
      });
    }
    setLoading(false);
  }, [open]);

  return (
    <>
      {loading && <Loading />}
      <Grid container spacing={2} padding={2}>
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
          <Controller
            name='type'
            control={control}
            rules={validateSelects("type", false)}
            render={({ field }) => (
              <Autocomplete
                value={
                  types.find((option) => option.value === field.value) || null
                }
                options={types}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) =>
                  field.onChange(value ? value.value : "")
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={errors.type?.message}
                    label='Zone'
                    error={!!errors.type}
                  />
                )}
              />
            )}
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
            <Button
              onClick={() => setOpen(false)}
              variant='contained'
              color='warning'
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant='contained'
              color='primary'
            >
              {selectedZone ? "Actualizar" : "Crear"}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
