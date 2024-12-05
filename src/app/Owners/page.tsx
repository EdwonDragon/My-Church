import React from "react";
import Form from "./Components/Form";

interface FormProps {
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
}

const Owners = ({ handleClose, setOpen, role }: FormProps) => {
  return <Form handleClose={handleClose} setOpen={setOpen} role={role} />;
};

export default Owners;
