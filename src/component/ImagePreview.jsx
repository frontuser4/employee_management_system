import { Dialog } from "@material-ui/core";

const ImagePreview = ({ open, setOpen, imageurl }) => {
  let baseurls = "http://64.227.141.209:8080";
  // let baseurls = "http://192.168.0.120:8000";

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <img src={`${baseurls}${imageurl}`} alt="image preview" />
    </Dialog>
  );
};

export default ImagePreview;
