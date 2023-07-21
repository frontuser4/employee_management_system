import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const ImagePreview = ({open, setOpen, imageurl}) => {
    
  let baseurls = 'http://13.126.67.127:8080';
  const handleClose = ()=>{
     setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
           <img src={`${baseurls}${imageurl}`} alt="image preview"/>
        </DialogContent>
    </Dialog>
  )
}

export default ImagePreview;