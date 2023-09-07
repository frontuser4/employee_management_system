import Box from "@mui/material/Box";
import EmployeeTables from "./EmployeeTables";
import ExpenseTables from "./ExpenceTables";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { data } = useSelector((state) => state.login.data);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2, overflowX: "auto" }}>
      {data.empGroup !== "level1" ? <EmployeeTables /> : <ExpenseTables />}
    </Box>
  );
}