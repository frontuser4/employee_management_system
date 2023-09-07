import {
  Box,
  Drawer,
  List,
  ListItemButton,
  styled,
  Tooltip,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollBar from "simplebar-react";
import SideBarMenuList from "./SideBarMenuList";

// custom styled components
const MainMenu = styled(Box)(({ theme }) => ({
  left: 0,
  width: 80,
  height: "100%",
  position: "fixed",
  boxShadow: theme.shadows[2],
  transition: "left 0.3s ease",
  zIndex: theme.zIndex.drawer + 11,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: { left: -80 },
  "& .simplebar-track.simplebar-vertical": { width: 7 },
  "& .simplebar-scrollbar:before": {
    background: theme.palette.text.primary,
  },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": { backgroundColor: "transparent" },
}));

// root component
const DashboardSideBar = ({
  showMobileSideBar,
  closeMobileSideBar,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("Dashboard");
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleActiveMainMenu = (menuItem) => () => {
    if(menuItem.title === 'Logout'){
      localStorage.removeItem('token');
    }
    setActive(menuItem.title);
    navigate(menuItem.path);
    closeMobileSideBar();
  };

  // main menus content
  const mainSideBarContent = (
    <List sx={{ height: "100%" }}>
      <StyledListItemButton disableRipple>
        <h1 className="text-cyan-600 font-bold text-2xl">EXP</h1>
      </StyledListItemButton>

      <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
        {SideBarMenuList.map((nav, index) => (
          <Tooltip title={nav.title} placement="right" key={index}>
            <StyledListItemButton
              disableRipple
              onClick={handleActiveMainMenu(nav)}
            >
              <nav.Icon
                sx={{
                  color:
                    active === nav.title ? "primary.main" : "#292524",
                }}
              />
            </StyledListItemButton>
          </Tooltip>
        ))}
      </ScrollBar>
    </List>
  );

  // for mobile device
  if (downMd) {
    return (
      <Drawer
        anchor="left"
        open={showMobileSideBar}
        onClose={closeMobileSideBar}
        PaperProps={{ sx: { width: 80 } }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            width: "inherit",
            position: "fixed",
            overflow: "hidden",
            flexDirection: "column",
            boxShadow: (theme) => theme.shadows[1],
            backgroundColor: (theme) => theme.palette.background.paper,
            "& .simplebar-track.simplebar-vertical": { width: 7 },
            "& .simplebar-scrollbar:before": {
              background: (theme) => theme.palette.text.primary,
            },
          }}
        >
          {mainSideBarContent}
        </Box>
      </Drawer>
    );
  }

  return <MainMenu>{mainSideBarContent}</MainMenu>;
};

export default DashboardSideBar;