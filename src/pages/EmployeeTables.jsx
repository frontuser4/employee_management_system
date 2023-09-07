import Box from "@mui/material/Box";
import EmployeeTable from "../component/employee/EmployeeTable";

function EmployeeTables() {

  return (
    <Box component="main" sx={{ flexGrow: 1,}}>
      <EmployeeTable />
    </Box>
  );
}

export default EmployeeTables;
