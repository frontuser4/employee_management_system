import {
  AppBar,
  Box,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProfilePopover from "./popovers/PopoversProfile";
import { MonthDropDown, YearDropDown } from "../component/Dropdown";
import { DateTimeContext } from "../context/dateTimeContext";
import { useContext } from "react";

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "0.5rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "#fff",
  borderBottom: "1px solid black",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const ToggleIcon = styled(Box)(({ theme }) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: theme.palette.primary.main,
}));

const DashboardNavbar = ({ setShowMobileSideBar }) => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { month, setMonth, year, setYear } = useContext(DateTimeContext);

  if (downSm) {
    return (
      <DashboardNavbarRoot position="sticky">
        <StyledToolBar>
          <Box sx={{ cursor: "pointer" }} onClick={setShowMobileSideBar}>
            <ToggleIcon />
            <ToggleIcon />
            <ToggleIcon />
          </Box>

          <Box flexGrow={1} textAlign="center">
            <h1 className="text-cyan-600 font-bold">Expense</h1>
          </Box>

          <ProfilePopover />
        </StyledToolBar>
      </DashboardNavbarRoot>
    );
  }

  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar>
        {downSm ? (
          <>
            <h1 className="text-cyan-600 font-bold">Expense</h1>
          </>
        ) : (
          <Box className="flex">
            <Box>
              <MonthDropDown label="Month" month={month} setMonth={setMonth} />
            </Box>
            <Box>
              <YearDropDown label="Year" year={year} setYear={setYear} />
            </Box>
          </Box>
        )}

        <Box flexGrow={1} ml={1} />

        <ProfilePopover />
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;
