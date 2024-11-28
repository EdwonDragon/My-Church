import { Button, DialogActions } from "@mui/material";
import React from "react";

interface ButtonProps {
  setOpen: (isOpen: boolean) => void;
  handleSubmit: (callback: () => void) => (event: React.FormEvent) => void;
  onSubmit: any;
  selected: any;
}

const ButtonsForm: React.FC<ButtonProps> = ({
  setOpen,
  handleSubmit,
  onSubmit,
  selected,
}) => {
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
        onClick={handleSubmit(onSubmit)}
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
