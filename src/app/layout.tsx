import { ReactNode } from "react";
import Providers from "@/store/providers";
import Authenticators from "@/components/Auth/Authenticators";
import Themes from "@/theme/themes";
import State from "../components/State/State";
import "@/theme/sweet.css";
export const metadata = {
  title: "My Church",
  icons: {
    icon: "/church-svgrepo-com.svg",
    shortcut: "/church-svgrepo-com.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='es'>
      <Themes>
        <body>
          <Providers>
            <Authenticators>
              <State />

              {children}
            </Authenticators>
          </Providers>
        </body>
      </Themes>
    </html>
  );
}
