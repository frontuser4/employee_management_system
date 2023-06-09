// import { useState } from 'react';
// import ExpenceTable from '../components/ExpenceTable';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { useLocation } from 'react-router-dom'; 
// import { Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// function ExpenceTables() {

//   const { state } = useLocation();
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
 
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav">
//         <Toolbar>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             ESM
//           </Typography>
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Profile settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Profile">
//                  <AccountCircleIcon />
//                 </Avatar>
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//                 <MenuItem className='flex flex-col gap-2'>
//                   <Typography textAlign="center">Name : {state.data.name}</Typography>
//                   <Typography textAlign="center">Id : {state.data.empId}</Typography>
//                   <Typography textAlign="center">Designation : {state.data.desig}</Typography>
//                   <Typography textAlign="center">Hq : {state.data.hq}</Typography>
//                 </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>
//        <Box component="main" sx={{ flexGrow: 1, px: 2, mt: 10, overflowX:'auto' }}>
//         <ExpenceTable />
//       </Box>  
//     </Box>
//   );
// }

// export default ExpenceTables;


import ExpenceTable from '../components/ExpenceTable';

const ExpenceTables = () => {
  return (
    <ExpenceTable/>
  )
}

export default ExpenceTables