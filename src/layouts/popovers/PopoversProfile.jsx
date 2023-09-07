import { Badge, Box, ButtonBase, Button, Avatar } from "@mui/material";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopoverLayout from './PopoversLayout';
import { useSelector } from 'react-redux';

const ProfilePopover = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data } = useSelector((state) => state.login.data);

  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <Avatar sx={{ width: 40, height: 40, ml: 1 }} />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <Box display="flex" alignItems="center" p={2}>
            <Box ml={1}>
              <p><span className="font-bold"> Name : </span>{data.name}</p>
              <p><span className="font-bold"> Id : </span> {data.empId}</p>
              <p><span className="font-bold"> Desig : </span> {data.desig}</p>
              <p><span className="font-bold"> Hq : </span> {data.hq}</p>
              <p><span className="font-bold"> Level : </span> {data.empGroup}</p>
            </Box>
          </Box>
        }
      >
        <Box pt={1} display="flex" alignItems="center" justifyContent="center">
          <Button
            onClick={() => {
              navigate("/login");
              localStorage.removeItem('token')
              toast.error("You Logout Successfully");
            }}
          >
            Logout
          </Button>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
