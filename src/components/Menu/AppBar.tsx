import React, { useCallback } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "@/store/hooks";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarComponentProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppBarComponent = ({ open, handleDrawerOpen }: AppBarComponentProps) => {
  const authUser = useAppSelector((state) => state.authUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { signOut } = useAuthenticator();

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <StyledAppBar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <img src='logo-def.png' alt='Logo' style={{ height: 40 }} />
        </Box>

        <Typography variant='h6' color='white' sx={{ flexGrow: 1 }}>
          {authUser.zoneOwner?.name}
        </Typography>
        <Typography variant='h6' color='white' sx={{ flexGrow: 1 }}>
          {authUser.user?.username}
        </Typography>

        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>

        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={signOut}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBarComponent;
