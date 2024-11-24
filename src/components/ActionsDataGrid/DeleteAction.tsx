import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface DeleteActionProps {
  id: string; // Assuming `id` is a string, you can adjust the type if necessary
  onDelete: (id: string) => void;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ id, onDelete }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleConfirmDelete = (): void => {
    onDelete(id);
    handleClose();
  };

  return (
    <>
      <IconButton
        title={"Eliminar conferencia"}
        onClick={handleClickOpen}
        aria-label='Eliminar'
        size='large'
      >
        <DeleteIcon color='secondary' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            No
          </Button>
          <Button onClick={handleConfirmDelete} color='primary' autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAction;
