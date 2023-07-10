import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UpdateForm from "../component/updateform/UpdateForm";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const UpdateTable = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = ()=> {
    localStorage.removeItem('token');
    navigate('/');
 }

 const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ESM
          </Typography>
          <Box>
            <Button onClick={handleLogout} variant="standard">
              Logout
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile">
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* <MenuItem className="flex flex-col gap-2">
                <Typography textAlign="center">
                  Name : {state.data.name}
                </Typography>
                <Typography textAlign="center">
                  Id : {state.data.empId}
                </Typography>
                <Typography textAlign="center">
                  Designation : {state.data.desig}
                </Typography>
                <Typography textAlign="center">Hq : {state.data.hq}</Typography>
              </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <UpdateForm editData={state} />
    </>
  );
};

export default UpdateTable;
