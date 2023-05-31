import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Calendar({ open, setOpen, setCalendar }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState(dayjs());

    const handleClose = () => {
        setCalendar(dayjs(value.$d).format('YYYY-MM-DD'))
        setOpen(false);
    };
    console.log("calendra: ", dayjs(value.$d).format('YYYY'), dayjs(value.$d).format('MM'), dayjs(value.$d).format('DD'))
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                            <DemoItem>
                                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

