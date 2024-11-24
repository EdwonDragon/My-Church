import { createTheme } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    white: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    white?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface Components {
    MuiDataGrid: {
      styleOverrides?: {
        root?: {};
      };
    };
  }
}

const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff",
      light: "#f9f9f9",
      dark: "#e0e0e0",
      contrastText: "#2c3a46",
    },
    primary: {
      main: "#2c3a46", // Color base
      light: "#4b5a68",
      dark: "#1a252e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#008e76", // Verde azulado fresco
      light: "#4ec6af",
      dark: "#025f4f",
      contrastText: "#ffffff", // Contraste blanco para botones y texto
    },
    error: {
      main: "#e53935",
      light: "#ff6f60",
      dark: "#ab000d",
      contrastText: "#ffffff",
    },
    success: {
      main: "#43a047",
      light: "#76d275",
      dark: "#00701a",
      contrastText: "#ffffff",
    },
    info: {
      main: "#1e88e5",
      light: "#6ab7ff",
      dark: "#005cb2",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f57c00",
      light: "#ffb74d",
      dark: "#bb4d00",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f6f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3a46",
      secondary: "#4b5a68",
    },
    action: {
      active: "#2c3a46",
      selected: "#4b5a68",
      disabled: "#e0e0e0",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.25rem",
      fontWeight: 600,
      color: "#1a252e",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#1a252e",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#2c3a46",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#2c3a46",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#4b5a68",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 400,
      color: "#4b5a68",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#757575",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#212121",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          padding: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c3a46",
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2c3a46",
          color: "#ffffff",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "--DataGrid-containerBackground": "#f5f6f7",
          "& .MuiDataGrid-columnHeader": {
            fontWeight: "bold",
            color: "#ffffff",
            backgroundColor: "#2c3a46",
          },
          "& .css-1ckov0h-MuiSvgIcon-root": { color: "white" },
        },
      },
    },
  },
});

export default theme;
