import React, { useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  validateAlphanumeric,
  validateEmail,
  validatePassword,
} from "@/validators";
import ButtonsForm from "@/components/ButtonsForm/ButtonsForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createUser, updateUser } from "@/store/thunks/thunkUsers/thunkUsers";
import { userSignUp } from "@/helpers/signUp";
import { updateZone } from "@/store/thunks/thunkZones/thunkZones";
interface FormProps {
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Owners = ({ handleClose, setOpen }: FormProps) => {
  const zones = useAppSelector((state) => state.zones);
  const owner = useAppSelector((state) => state.users);
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
    data.role = "OWNER";
    if (owner.selectedUser) {
      await dispatch(updateUser(owner.selectedUser.id, data));
    } else {
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

  return (
    <>
      {owner.loading && <Loading />}

      <Grid container spacing={2} m={2}>
        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("username"), // This ensures shrink is a boolean (true or false)
              },
            }}
            variant='outlined'
            {...register("username", validateAlphanumeric("Usuario"))}
            label='Usuario'
            fullWidth
            helperText={errors.username?.message}
            error={!!errors.username}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("email"), // This ensures shrink is a boolean (true or false)
              },
            }}
            variant='outlined'
            {...register("email", validateEmail("Correo"))}
            label='Correo'
            fullWidth
            helperText={errors.email?.message}
            error={!!errors.email}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("password"), // This ensures shrink is a boolean (true or false)
              },
            }}
            variant='outlined'
            {...register("password", validatePassword("Contraseña"))}
            label='Contraseña'
            fullWidth
            helperText={errors.password?.message}
            error={!!errors.password}
          />
        </Grid>

        <Grid size={6}>
          <TextField
            slotProps={{
              inputLabel: {
                shrink: !!watch("rfc"), // This ensures shrink is a boolean (true or false)
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
                shrink: !!watch("curp"), // This ensures shrink is a boolean (true or false)
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
        <Grid size={6}>
          <ButtonsForm
            setOpen={setOpen}
            selected={owner.selectedUser}
            trigger={trigger}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Owners;
