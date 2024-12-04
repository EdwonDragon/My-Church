import { defineAuth } from "@aws-amplify/backend";
import { createUser } from "./create-user/resource";
import { addUserToGroup } from "./add-user-to-group/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Confirma tu cuenta en My church",
      verificationEmailBody: (createCode) => `
       <html>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
              <tr>
                <td align="center">
                  <table width="600" cellspacing="0" cellpadding="20" style="background-color: #ffffff; border-radius: 8px;">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <img src="https://w7.pngwing.com/pngs/669/851/png-transparent-united-methodist-church-cross-and-flame-methodism-christian-church-god-united-angle-christianity-text.png" alt="My Church Logo" style="width: 150px; height: auto;">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 style="color: #2c3e50; text-align: center;">¡Bienvenido/a a My Church!</h2>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                          Gracias por registrarte. Para comenzar a disfrutar de todos nuestros servicios, por favor confirma tu cuenta utilizando el siguiente código:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                          <h3 style="color: #3498db; font-size: 24px;">Código de verificación: <strong>${createCode()}</strong></h3>
                        </div>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                          Si no iniciaste este registro, puedes ignorar este correo. Si necesitas ayuda, no dudes en contactarnos.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 10px; background-color: #ecf0f1; border-top: 1px solid #dcdcdc;">
                        <p style="font-size: 12px; color: #7f8c8d; margin: 0;">
                          Atentamente,<br>
                          El equipo de My Church
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      userInvitation: {
        emailSubject: "Te damos la bienvenida a My church",
        emailBody: (user, code) => `
         <html>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
              <tr>
                <td align="center">
                  <table width="600" cellspacing="0" cellpadding="20" style="background-color: #ffffff; border-radius: 8px;">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <img src="https://w7.pngwing.com/pngs/669/851/png-transparent-united-methodist-church-cross-and-flame-methodism-christian-church-god-united-angle-christianity-text.png" alt="My Church Logo" style="width: 150px; height: auto;">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 style="color: #2c3e50; text-align: center;">¡Hola, ${user()}!</h2>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                          Estamos emocionados de darte la bienvenida a My Church. Como parte de nuestro equipo, ahora puedes acceder a nuestra plataforma y disfrutar de todos nuestros servicios.
                        </p>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                          Aquí tienes tu información de acceso:
                        </p>
                        <ul style="color: #555; font-size: 16px; line-height: 1.5; list-style: none; padding: 0;">
                          <li><strong>Nombre de usuario:</strong> ${user()}</li>
                          <li><strong>Contraseña temporal:</strong> ${code()}</li>
                        </ul>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                          Por favor, inicia sesión, cambia tu contraseña y confirma tu acceso.
                        </p>

                        <p style="color: #555; font-size: 16px; line-height: 1.5;">Sigue este enlace para continuar <a href="http://localhost:3000/" style="color: #1a73e8;">my-church</a></p>

                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                          Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 10px; background-color: #ecf0f1; border-top: 1px solid #dcdcdc;">
                        <p style="font-size: 12px; color: #7f8c8d; margin: 0;">
                          ¡Gracias por ser parte de nuestra comunidad!<br>
                          Atentamente,<br>
                          El equipo de My Church
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
      },
    },
  },
  userAttributes: {
    "custom:role": {
      dataType: "String",
      mutable: true,
    }
  },

  groups: ["SUPERADMIND", "OWNER", "LEADER"],
  access: (allow) => [
    allow.resource(createUser).to(["createUser"]),
    allow.resource(addUserToGroup).to(["addUserToGroup"])
  ],
});
