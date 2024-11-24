import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface ModalProps {
  title: string; // The title of the modal, expects a string
  children: React.ReactNode; // The content inside the modal, can be any valid React node
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // Setter function for the open state
  open: boolean; // Boolean to control whether the modal is open or closed
}

const Modal: React.FC<ModalProps> = ({ title, children, setOpen, open }) => {
  return (
    <Dialog maxWidth='xl' open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
