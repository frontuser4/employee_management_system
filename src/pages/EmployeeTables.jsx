import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EmployeeTable from '../component/employee/EmployeeTable'; 
import { useSelector } from "react-redux";

function EmployeeTables() {
  const { data } = useSelector((state) => state.login.data);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ESM
          </Typography>
          <Box>
            <Typography>Hello, {data.name}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
       <Box component="main" sx={{ flexGrow: 1, px: 2, overflowX:'auto' }}>
        <EmployeeTable />
      </Box>  
    </Box>
  );
}


export default EmployeeTables;