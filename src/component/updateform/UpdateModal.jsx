import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import UpdateForm from './Updateform';

export default function UpdateModal({open, setOpen, editData, setCloseUpdateform}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className='text-center'>
          Monthly Expenses
        </DialogTitle>
        <DialogContent>
         <UpdateForm setOpen={setOpen} editData={editData} setCloseUpdateform={setCloseUpdateform}/>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button onClick={handleClose} autoFocus>
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}