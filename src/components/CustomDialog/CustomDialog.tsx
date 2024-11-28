import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface CustomDialogProps {
  title: string;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  children,
  setOpen,
  open,
}) => {
  return (
    <Dialog maxWidth='lg' open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
