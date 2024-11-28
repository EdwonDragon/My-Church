"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { Autocomplete, TextField } from "@mui/material";
import { validateAlphanumeric, validateSelects } from "@/validators";
import { showAlert } from "@/components/SweetAlert/Alert";
import Loading from "@/components/Loading/Loading";
import types from "../Helpers/types.json";
import { client } from "@/helpers/Client";
import { CheckErrors } from "@/helpers/CheckErrors";
import ButtonsForm from "../../../components/ButtonsForm/ButtonsForm";
import { UploadFile } from "@/components/UploadFile/UploadFile";

interface FormProps {
  selectedZone: Record<string, any>;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const Form = ({ selectedZone, handleClose, setOpen, open }: FormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", location: "", logo: [], type: "" },
  });

  const [loading, setLoading] = useState(true);
  const [files, setFiles]: any = useState({});

  useEffect(() => {
    const array: any = Object.keys(files).map((key) => key);
    setValue("logo", array);
  }, [files]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let newData;
      if (selectedZone) {
        newData = await client.models.Zone.update({
          id: selectedZone.id,
          ...data,
        });
      } else {
        newData = await client.models.Zone.create(data);
      }
      await CheckErrors(newData);
      handleClose();
      setLoading(false);
      showAlert({
        title: "¡Éxito!",
        message: "Los datos se guardaron correctamente.",
        type: "success",
      });
    } catch (error: any) {
      setLoading(false);
      handleClose();
      showAlert({
        title: "¡Error!",
        message: error,
        type: "warning",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (selectedZone) {
      reset({
        location: selectedZone.location,
        name: selectedZone.name,
        type: selectedZone.type,
      });
      if (selectedZone.logo.length > 0) {
        setFiles({
          [selectedZone.logo]: {
            status: "success",
          },
        });
      }
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
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            selected={selectedZone}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
