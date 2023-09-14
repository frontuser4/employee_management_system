import { Box, styled, Paper } from "@mui/material";
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSideBar";
import { MonthDropDown, YearDropDown } from "../component/Dropdown";
import { useContext } from "react";
import { DateTimeContext } from "../context/dateTimeContext";

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  width: `calc(100% - 80px)`,
  // maxWidth: 1200,
  margin: "auto",
  paddingLeft: 50,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
}));

const DashboardLayout = ({ children }) => {
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const { month, setMonth, year, setYear } = useContext(DateTimeContext);

  return (
    <Fragment>
      <DashboardSidebar
        showMobileSideBar={showMobileSideBar}
        closeMobileSideBar={() => setShowMobileSideBar(false)}
      />

      <Wrapper>
        <DashboardNavbar
          setShowMobileSideBar={() => setShowMobileSideBar((state) => !state)}
        />
        <Paper sx={{ display: "flex", alignItems: "center", padding:1, marginBottom:'10px' }}>
          <Box>
            <MonthDropDown label="Month" month={month} setMonth={setMonth} />
          </Box>
          <Box>
            <YearDropDown label="Year" year={year} setYear={setYear} />
          </Box>
        </Paper>
        {children || <Outlet />}
      </Wrapper>
    </Fragment>
  );
};

export default DashboardLayout;
