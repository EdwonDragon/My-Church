"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { Autocomplete, TextField } from "@mui/material";
import { validateAlphanumeric, validateSelects } from "@/validators";
import Loading from "@/components/Loading/Loading";
import types from "@/Jsons/zones.json";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import { UploadFile } from "@/components/UploadFile/UploadFile";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createZone, updateZone } from "@/store/thunks/thunkZones/thunkZones";

interface FormProps {
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ handleClose, setOpen }: FormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", location: "", logo: [], type: "" },
  });
  const zones = useAppSelector((state) => state.zones);
  const dispatch = useAppDispatch();
  const [files, setFiles]: any = useState({});
  useEffect(() => {
    const array: any = Object.keys(files).map((key) => key);
    setValue("logo", array);
  }, [files]);

  const onSubmit = async (data: any) => {
    if (zones.selectedZone) {
      dispatch(updateZone(zones.selectedZone.id, data));
    } else {
      dispatch(createZone(data));
    }
    handleClose();
  };

  useEffect(() => {
    if (zones.selectedZone) {
      reset({
        location: zones.selectedZone.location,
        name: zones.selectedZone.name,
        type: zones.selectedZone.type,
      });
      if (zones.selectedZone.logo) {
        setFiles({
          [zones.selectedZone.logo]: {
            status: "success",
          },
        });
      }
    }
  }, [zones.selectedZone]);

  return (
    <>
      {zones.loading && <Loading />}
      <Grid container spacing={2} padding={2}>
        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("name"), // This ensures shrink is a boolean (true or false)
              },
            }}
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
            slotProps={{
              inputLabel: {
                shrink: !!watch("location"), // This ensures shrink is a boolean (true or false)
              },
            }}
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
          <UploadFile
            max={1}
            files={files}
            setFiles={setFiles}
            title={"Logo"}
            acceptedFileTypes={["*"]}
            deleteFiles={true}
          />
        </Grid>

        <Grid size={12}>
          <ButtonsForm
            setOpen={setOpen}
            selected={zones.selectedZone}
            trigger={trigger}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
