import React, { useState } from "react";
import Loading from "@/components/Loading/Loading";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { validateAlphanumeric } from "@/validators";
import ButtonsForm from "@/components/ButtonsForm/ButtonsForm";
interface FormProps {
  selectedOwner: Record<string, any>;
  handleCloseOnwer: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const Owners = ({
  selectedOwner,
  handleCloseOnwer,
  setOpen,
  open,
}: FormProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      logo: "",
      username: "",
      email: "",
      role: "",
      rfc: "",
      curp: "",
    },
  });

  const onSubmit = (data: any) => {};
  return (
    <>
      {loading && <Loading />}

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("logo", validateAlphanumeric("Logo"))}
            label='Logo'
            fullWidth
            helperText={errors.logo?.message}
            error={!!errors.logo}
          />
        </Grid>
        <Grid size={12}>
          <TextField
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
            variant='outlined'
            {...register("email", {
              required: "Correo es requerido",
              validate: (value: string) =>
                /\S+@\S+\.\S+/.test(value) || "Correo no válido",
            })}
            label='Correo'
            fullWidth
            helperText={errors.email?.message}
            error={!!errors.email}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("role", validateAlphanumeric("Rol"))}
            label='Rol'
            fullWidth
            helperText={errors.role?.message}
            error={!!errors.role}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("rfc", validateAlphanumeric("RFC"))}
            label='RFC'
            fullWidth
            helperText={errors.rfc?.message}
            error={!!errors.rfc}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            variant='outlined'
            {...register("curp", validateAlphanumeric("CURP"))}
            label='CURP'
            fullWidth
            helperText={errors.curp?.message}
            error={!!errors.curp}
          />
        </Grid>
        <Grid size={12}>
          <ButtonsForm
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            selected={selectedOwner}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Owners;
