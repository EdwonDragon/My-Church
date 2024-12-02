"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { Autocomplete, TextField } from "@mui/material";
import { validateAlphanumeric, validateSelects } from "@/validators";
import Loading from "@/components/Loading/Loading";
import zones from "@/Jsons/zones.json";
import roles from "@/Jsons/roles.json";
import ButtonsForm from "@/components/ButtonsForm/ButtonsForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchZoneByType } from "@/store/thunks/thunkZones/thunkZones";
import {
  createModule,
  updateModule,
} from "@/store/thunks/thunkModules/thunkModules";
import { setLoading } from "@/store/slices/modulesSlice/modulesSlice";

interface FormProps {
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModuleForm = ({ handleClose, setOpen }: FormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      route: "",
      owner: "",
      zoneId: null,
      rolesUser: [],
    },
  });

  const { selectedZone } = useAppSelector((state) => state.zones);
  const modules = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    delete data.owner;

    if (modules.selectedModule) {
      dispatch(updateModule(modules.selectedModule.id, data));
    } else {
      dispatch(createModule(data));
    }
    handleClose();
  };

  const getInfo = async () => {
    dispatch(setLoading(true));
    if (modules.selectedModule) {
      const { data } = await modules.selectedModule.zone();
      reset({
        name: modules.selectedModule.name,
        route: modules.selectedModule.route,
        zoneId: modules.selectedModule.zoneId,
        rolesUser: modules.selectedModule.rolesUser,
        owner: data.type,
      });
    }
    dispatch(setLoading(false));
  };
  useEffect(() => {
    getInfo();
  }, [modules.selectedModule]);

  const fetchFrom = async () => {
    dispatch(fetchZoneByType(watch("owner")));
  };

  useEffect(() => {
    if (watch("owner")) {
      fetchFrom();
    }
  }, [watch("owner")]);

  return (
    <>
      {modules.loading && <Loading />}

      <Grid container spacing={2} padding={2}>
        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("name"), // This ensures shrink is a boolean (true or false)
              },
            }}
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
            slotProps={{
              inputLabel: {
                shrink: !!watch("route"), // This ensures shrink is a boolean (true or false)
              },
            }}
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

        <Grid size={12}>
          <Controller
            name='rolesUser'
            control={control}
            rules={validateSelects("rolesUser", false)}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={roles}
                getOptionLabel={(option) => option.name}
                value={roles.filter((option) =>
                  (field.value as string[]).includes(option.value)
                )}
                onChange={(_, value) =>
                  field.onChange(value.map((option) => option.value))
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={errors.rolesUser?.message}
                    label='Roles'
                    error={!!errors.rolesUser}
                  />
                )}
              />
            )}
          />
        </Grid>

        {selectedZone && `No hay registros de ${watch("owner")} `}
        {watch("owner") && selectedZone && (
          <Grid size={12}>
            <Controller
              name='zoneId'
              control={control}
              rules={validateSelects("zoneId", false)}
              render={({ field }) => (
                <Autocomplete
                  value={
                    selectedZone.find(
                      (option: any) => option.id === field.value
                    ) || null
                  }
                  options={selectedZone}
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
            selected={modules.selectedModule}
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
