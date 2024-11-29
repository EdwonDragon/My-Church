import { useAppDispatch } from "@/store/hooks";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";
import { Button, DialogActions } from "@mui/material";
import React from "react";

interface ButtonProps {
  setOpen: (isOpen: boolean) => void;
  selected: any;
  trigger: any;
  handleSubmit: any;
  onSubmit: any;
}

const ButtonsForm: React.FC<ButtonProps> = ({
  setOpen,
  selected,
  trigger,
  handleSubmit,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();

  const checkErrors = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      handleSubmit(onSubmit)();
    } else {
      dispatch(
        setMessage({
          title: "¡Error!",
          message: "Revise el formulario, faltan datos",
          type: "warning",
        })
      );
    }
  };

  return (
    <DialogActions>
      <Button
        onClick={() => setOpen(false)}
        variant='contained'
        color='warning'
        aria-label='Cancelar acción'
      >
        Cancelar
      </Button>
      <Button
        onClick={checkErrors}
        variant='contained'
        color='primary'
        aria-label={selected ? "Actualizar registro" : "Crear nuevo registro"}
      >
        {selected ? "Actualizar" : "Crear"}
      </Button>
    </DialogActions>
  );
};

export default ButtonsForm;
