import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff", // Color blanco
    },
    primary: {
      main: "#6e8a91", // Verde grisáceo suave
      light: "#A0B9B1", // Verde más claro
      dark: "#3E5A54", // Verde más oscuro
      contrastText: "#ffffff", // Contraste blanco
    },
    secondary: {
      main: "#FF7043", // Naranja suave
      light: "#FFCCBC",
      dark: "#D84315",
      contrastText: "#ffffff", // Contraste blanco
    },
    error: {
      main: "#E57373", // Rojo suave
      light: "#FF8A80",
      dark: "#D32F2F",
      contrastText: "#ffffff", // Contraste blanco
    },
    success: {
      main: "#81C784", // Verde suave
      light: "#A5D6A7",
      dark: "#388E3C",
      contrastText: "#ffffff", // Contraste blanco
    },
    info: {
      main: "#64B5F6", // Azul claro
      light: "#BBDEFB",
      dark: "#1976D2",
      contrastText: "#ffffff", // Contraste blanco
    },
    background: {
      default: "#F5F5F5", // Fondo gris suave
      paper: "#ffffff", // Fondo blanco para componentes como cards
    },
    text: {
      primary: "#212121",
      secondary: "#ffffff", // Blanco como color de texto secundario
    },
    action: {
      active: "#6e8a91", // Color de iconos activos
      hover: "#A0B9B1", // Hover en iconos
      selected: "#3E5A54", // Selección
      disabled: "#E1E1E1", // Deshabilitado
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Fuente predeterminada
    h1: {
      fontSize: "2.25rem",
      fontWeight: 600,
      color: "#3E5A54",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#3E5A54",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#3E5A54",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#3E5A54",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#3E5A54",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 400,
      color: "#3E5A54",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#757575",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#757575",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#212121",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#757575",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 300,
      color: "#757575",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8, // Bordes redondeados
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Bordes redondeados para los botones
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
        },
        outlined: {
          borderColor: "#6e8a91", // Color de borde del botón outlined
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra suave en las tarjetas
          borderRadius: 12,
          padding: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordes redondeados para los campos de texto
          marginBottom: 16,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#6e8a91", // Color del fondo del AppBar
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#6e8a91", // Fondo gris suave para el Drawer
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.8rem", // Tamaño predeterminado para todos los iconos
          color: "#6e8a91", // Color del icono
          backgroundColor: "#ffffff", // Fondo blanco para iconos
          borderRadius: "50%", // Bordes redondeados para el fondo
          padding: "1px", // Espaciado para que el fondo no quede pegado al icono
          transition: "color 0.3s ease, background-color 0.3s ease", // Transiciones suaves
          "&:hover": {
            color: "#3E5A54", // Cambio de color al pasar el cursor
            backgroundColor: "#f0f0f0", // Cambio de fondo al pasar el cursor
          },
        },
      },
    },
  },
});

export default theme;
