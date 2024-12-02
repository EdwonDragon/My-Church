import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface CustomDialogProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  handleClose: any;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  children,
  open,
  handleClose,
}) => {
  return (
    <Dialog maxWidth='lg' open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
