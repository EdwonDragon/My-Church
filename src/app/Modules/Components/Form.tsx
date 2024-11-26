"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../../amplify/data/resource";
import { Button, DialogActions, TextField } from "@mui/material";
import { validateAlphanumeric } from "@/validators";
import { showAlert } from "@/components/SweetAlert/Alert";
import Loading from "@/components/Loading/Loading";

const client = generateClient<Schema>();

interface FormProps {
  selectedModule: Record<string, any> | null;
  setModules: React.Dispatch<React.SetStateAction<any[]>>;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const ModuleForm = ({
  selectedModule,
  setModules,
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
    defaultValues: { name: "", route: "" },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (selectedModule) {
        await client.models.Modules.update({
          id: selectedModule.id,
          ...data,
        });
      } else {
        await client.models.Modules.create(data);
      }

      const { data: updatedModules } = await client.models.Modules.list();
      setModules(updatedModules);

      handleClose();
      setLoading(false);
      showAlert({
        title: "¡Éxito!",
        message: "El módulo se guardó correctamente.",
        type: "success",
      });
    } catch (error) {
      setLoading(false);
      handleClose();
      showAlert({
        title: "¡Error!",
        message: "Hubo un problema al guardar el módulo.",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    if (open && selectedModule) {
      reset({
        name: selectedModule.name,
        route: selectedModule.route,
      });
    } else {
      reset({
        name: "",
        route: "",
      });
    }
  }, [open, selectedModule, reset]);

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              variant='outlined'
              {...register("name", validateAlphanumeric("Nombre del módulo"))}
              label='Nombre del módulo'
              fullWidth
              helperText={errors.name?.message}
              error={!!errors.name}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              variant='outlined'
              {...register("route", validateAlphanumeric("Ruta del módulo"))}
              label='Ruta del módulo'
              fullWidth
              helperText={errors.route?.message}
              error={!!errors.route}
            />
          </Grid>

          <Grid size={12}>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color='secondary'>
                Cancelar
              </Button>
              <Button type='submit' color='primary'>
                {selectedModule ? "Actualizar" : "Crear"}
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ModuleForm;
