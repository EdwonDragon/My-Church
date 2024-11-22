import React from "react";
import Providers from "@/store/providers";
import Authenticators from "@/components/Auth/Authenticators";
import Themes from "@/theme/themes";
import Menu from "@/components/Menu/Menu";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Container } from "@mui/material";

export const metadata = {
  title: "My Church",
  icons: {
    icon: "/church-svgrepo-com.svg",
    shortcut: "/church-svgrepo-com.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/* Aplicar el tema global a toda la app */}
      <Themes>
        <body>
          {/* Proveedores y autenticadores envuelven a la aplicación */}
          <Providers>
            <Authenticators>
              {/* Menú de navegación personalizado */}
              <Menu />

              {/* Contenido de la página */}
              {children}
            </Authenticators>
          </Providers>
        </body>
      </Themes>
    </html>
  );
}
