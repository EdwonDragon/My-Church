import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/create-user";
import {
    AdminCreateUserCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["createUser"]["functionHandler"];
const client = new CognitoIdentityProviderClient();

export const handler: Handler = async (event) => {
    const { userName, TemporaryPassword } = event.arguments;

    try {
        const command = new AdminCreateUserCommand({
            Username: userName,
            UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
            TemporaryPassword: TemporaryPassword,
        });

        const response = await client.send(command);
        return {
            success: true,
            message: "Usuario creado exitosamente.",
            data: response,
        };
    } catch (error: any) {
        console.error("Error al crear el usuario:", error);

        // Manejo de errores específicos
        if (error.name === "UserNotFoundException") {
            return {
                success: false,
                message: "No se encontró el grupo de usuarios.",
                error: error.message,
            };
        } else if (error.name === "InvalidParameterException") {
            return {
                success: false,
                message: "Parámetros de entrada no válidos.",
                error: error.message,
            };
        } else if (error.name === "UsernameExistsException") {
            return {
                success: false,
                message: "El nombre de usuario ya existe.",
                error: error.message,
            };
        }

        return {
            success: false,
            message: "Ocurrió un error inesperado.",
            error: error.message,
        };
    }
};
