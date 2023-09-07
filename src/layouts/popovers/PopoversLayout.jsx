import {Divider, Popover } from "@mui/material";

const PopoverLayout = (props) => {
  const {
    children,
    popoverClose,
    popoverOpen,
    anchorRef,
    title,
    minWidth,
    maxWidth,
  } = props;
  return (
    <Popover
      open={popoverOpen}
      onClose={popoverClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      PaperProps={{
        sx: {
          minWidth: minWidth || 250,
          maxWidth: maxWidth || 375,
          width: "100%",
          padding: "0.5rem 0",
        },
      }}
    >
      <h2 fontWeight="700" p={2}>
        {title || "Notifications"}
      </h2>
      <Divider />
      {children}
    </Popover>
  );
};

export default PopoverLayout;
