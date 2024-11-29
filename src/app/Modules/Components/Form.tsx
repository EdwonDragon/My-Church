"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { Autocomplete, Button, DialogActions, TextField } from "@mui/material";
import { validateAlphanumeric, validateSelects } from "@/validators";
import { showAlert } from "@/components/SweetAlert/Alert";
import Loading from "@/components/Loading/Loading";
import zones from "../Helpers/zones.json";
// import { client } from "@/helpers/Client";
// import { CheckErrors } from "@/helpers/CheckErrors";
import ButtonsForm from "@/components/ButtonsForm/ButtonsForm";

interface FormProps {
  selectedModule: Record<string, any> | null;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const ModuleForm = ({
  selectedModule,
  handleClose,
  setOpen,
  open,
}: FormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", route: "", owner: "", zoneId: null },
  });

  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState<any[]>([]);

  const onSubmit = async (data: any) => {
    // delete data.owner;
    // setLoading(true);
    // try {
    //   let newData;
    //   if (selectedModule) {
    //     newData = await client.models.Modules.update({
    //       id: selectedModule.id,
    //       ...data,
    //     });
    //   } else {
    //     newData = await client.models.Modules.create(data);
    //   }
    //   await CheckErrors(newData);
    //   handleClose();
    //   setLoading(false);
    //   showAlert({
    //     title: "¡Éxito!",
    //     message: "El módulo se guardó correctamente.",
    //     type: "success",
    //   });
    // } catch (error: any) {
    //   setLoading(false);
    //   handleClose();
    //   showAlert({
    //     title: "¡Error!",
    //     message: error,
    //     type: "warning",
    //   });
    // }
  };

  useEffect(() => {
    if (open && selectedModule) {
      reset({
        name: selectedModule.name,
        route: selectedModule.route,
        zoneId: selectedModule.zoneId,
        owner: selectedModule.conferenceData
          ? "Conference"
          : selectedModule.districtData
          ? "District"
          : "Church",
      });
    } else {
      reset({
        name: "",
        route: "",
        zoneId: null,
        owner: "",
      });
    }
  }, [open, selectedModule, reset]);

  const fetchFrom = async () => {
    setLoading(true);

    // try {
    //   const { data } = await client.models.Zone.listZoneByType({
    //     type: watch("owner"),
    //   });

    //   setFrom(data);
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   showAlert({
    //     title: "¡Error!",
    //     message: "Hubo un problema al cargar las conferencias.",
    //     type: "warning",
    //   });
    // }
  };

  useEffect(() => {
    if (watch("owner")) {
      fetchFrom();
    }
  }, [watch("owner")]);

  return (
    <>
      {loading && <Loading />}

      <Grid container spacing={2} padding={2}>
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
          <Controller
            name='owner'
            control={control}
            rules={validateSelects("owner", false)}
            render={({ field }) => (
              <Autocomplete
                value={
                  zones.find((option) => option.value === field.value) || null
                }
                options={zones}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) =>
                  field.onChange(value ? value.value : "")
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={errors.owner?.message}
                    label='Zone'
                    error={!!errors.owner}
                  />
                )}
              />
            )}
          />
        </Grid>
        {from.length <= 0 && `No hay registros de ${watch("owner")} `}
        {watch("owner") && from.length > 0 && (
          <Grid size={12}>
            <Controller
              name='zoneId'
              control={control}
              rules={validateSelects("zoneId", false)}
              render={({ field }) => (
                <Autocomplete
                  value={
                    from.find((option) => option.id === field.value) || null
                  }
                  options={from}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => field.onChange(value ? value.id : "")}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={errors.zoneId?.message}
                      label='¿Para?'
                      error={!!errors.zoneId}
                    />
                  )}
                />
              )}
            />
          </Grid>
        )}

        <Grid size={12}>
          <ButtonsForm
            setOpen={setOpen}
            selected={selectedModule}
            trigger={trigger}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ModuleForm;
