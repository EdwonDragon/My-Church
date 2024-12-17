import React from "react";
import Form from "./Components/Form";

const Owners = ({ handleClose, setOpen, role }: any) => {
  return <Form handleClose={handleClose} setOpen={setOpen} role={role} />;
};

export default Owners;
