"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import Grid from "@mui/material/Grid2";
import { FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  validateAlphanumeric,
  validateEmail,
  validatePassword,
} from "@/validators";
import ButtonsForm from "@/components/ButtonsForm/ButtonsForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createUser,
  fetchZoneByEmail,
  updateUser,
} from "@/store/thunks/thunkUsers/thunkUsers";
import { updateZone } from "@/store/thunks/thunkZones/thunkZones";

interface FormProps {
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
}

const Form = ({ handleClose, setOpen, role }: FormProps) => {
  const zones = useAppSelector((state) => state.zones);
  const owner = useAppSelector((state) => state.users);
  const [existEmail, setExistEmail] = useState(false);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      rfc: "",
      curp: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (owner.selectedUser) {
      delete data.email;
      delete data.password;
      await dispatch(updateUser(owner.selectedUser.id, data));
    } else {
      data.role = role;
      const newData = await dispatch(createUser(data));
      await dispatch(
        updateZone(zones.selectedZone.id, { ownerId: newData?.data?.id }, true)
      );
    }
    handleClose();
  };

  useEffect(() => {
    if (owner.selectedUser) {
      reset({
        username: owner.selectedUser.username,
        email: owner.selectedUser.email,
        rfc: owner.selectedUser.rfc,
        curp: owner.selectedUser.curp,
        password: owner.selectedUser.password,
      });
    }
  }, [owner.selectedUser]);

  const checkEmail: any = async () => {
    const data = await dispatch(fetchZoneByEmail(watch("email")));
    setExistEmail(data ? data.length > 0 : false);
  };
  useEffect(() => {
    if (!owner.selectedUser) {
      checkEmail();
    }
  }, [watch("email")]);

  return (
    <>
      {owner.loading && <Loading />}

      <Grid container spacing={2} m={2}>
        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("username"),
              },
            }}
            variant='outlined'
            {...register("username", validateAlphanumeric("Nombre completo"))}
            label='Nombre completo'
            fullWidth
            helperText={errors.username?.message}
            error={!!errors.username}
          />
        </Grid>

        <Grid size={6}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("rfc"),
              },
            }}
            variant='outlined'
            {...register("rfc", validateAlphanumeric("RFC"))}
            label='RFC'
            fullWidth
            helperText={errors.rfc?.message}
            error={!!errors.rfc}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("curp"),
              },
            }}
            variant='outlined'
            {...register("curp", validateAlphanumeric("CURP"))}
            label='CURP'
            fullWidth
            helperText={errors.curp?.message}
            error={!!errors.curp}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("email"),
              },
            }}
            disabled={owner.selectedUser}
            variant='outlined'
            {...register("email", validateEmail("Correo"))}
            label='Correo'
            fullWidth
            helperText={errors.email?.message}
            error={!!errors.email}
          />
          {existEmail && (
            <FormHelperText error>
              El email ya esta registrado en el sistema
            </FormHelperText>
          )}
        </Grid>

        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("password"),
              },
            }}
            variant='outlined'
            disabled={owner.selectedUser}
            {...register("password", validatePassword("Contraseña"))}
            label='Contraseña'
            fullWidth
            helperText={errors.password?.message}
            error={!!errors.password}
          />
        </Grid>

        <Grid size={12}>
          <ButtonsForm
            setOpen={setOpen}
            selected={owner.selectedUser}
            trigger={trigger}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            exist={existEmail}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
