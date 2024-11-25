"use client";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Image, View } from "@aws-amplify/ui-react";
import React from "react";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { Box } from "@mui/material"; // Material UI components
import "./style.css";
Amplify.configure(outputs);

const Authenticators = ({ children }) => {
  const components = {
    SignIn: {
      Header() {
        return (
          <View padding='1rem' textAlign='center'>
            <Image height='20%' width='20%' src='logo-login.png' top={5} />
          </View>
        );
      },
    },
  };

  const formFields = {
    signIn: {
      username: {
        label: "Correo electronico",
        placeholder: "Ingresa tu correo electronico",
      },
      password: {
        label: "Contraseña",
        placeholder: "Ingresa tu contraseña",
      },
    },

    forgotPassword: {
      username: {
        label: "Correo electronico",
        placeholder: "Ingresa tu correo electronico",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Authenticator
        components={components}
        formFields={formFields}
        hideSignUp={true}
      >
        {children}
      </Authenticator>
    </Box>
  );
};

export default Authenticators;
