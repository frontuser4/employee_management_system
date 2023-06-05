import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';


const Profile = ({open, setOpen}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { state } = useLocation();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        minWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Profile
        </DialogTitle>
        <DialogContent>
          <Box className='flex item-center justify-center'>
            <Avatar sx={{ height: '70px', width: '70px' }} />
          </Box>
          <DialogContentText my={3}>
            <Typography>Name : {state.data.name}</Typography>
            <Typography>Designation : {state.data.desig}</Typography>
            <Typography>Employee ID : {state.data.empId}</Typography>
            <Typography>Address : {state.data.hq}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Profile;