"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { validateAlphanumeric } from "@/validators";
import Loading from "@/components/Loading/Loading";
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
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", location: "", logo: [] },
  });
  const zones = useAppSelector((state) => state.zones);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const [files, setFiles]: any = useState({});
  useEffect(() => {
    const array: any = Object.keys(files).map((key) => key);
    setValue("logo", array);
  }, [files]);

  const onSubmit = async (data: any) => {
    if (zones.selectedZone) {
      dispatch(updateZone(zones.selectedZone.id, data, false));
    } else {
      if (authUser.user.role == "SUPERADMIND") {
        data.type = "Conference";
      } else {
        const { data: zone } = await authUser.user.zoneOwner();
        data.type = zone.type === "Conference" ? "District" : "Church";
      }
      dispatch(createZone(data));
    }
    handleClose();
  };

  useEffect(() => {
    if (zones.selectedZone) {
      reset({
        location: zones.selectedZone.location,
        name: zones.selectedZone.name,
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
                shrink: !!watch("name"),
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
                shrink: !!watch("location"),
              },
            }}
            variant='outlined'
            {...register("location", validateAlphanumeric("Ubicación"))}
            label={"Ubicación"}
            fullWidth
            helperText={errors.location?.message}
            error={!!errors.location}
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
