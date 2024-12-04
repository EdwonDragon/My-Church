import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

interface EditActionProps {
  id: string; // Assuming `id` is a string, you can adjust the type if necessary
  handleEdit: (id: string) => void;
}

const EditAction = ({ handleEdit, id }: EditActionProps) => {
  return (
    <>
      <IconButton
        title={"Editar zone"}
        onClick={() => handleEdit(id)}
        aria-label='Editar'
        size='large'
      >
        <EditIcon color='primary' />
      </IconButton>
    </>
  );
};

export default EditAction;
