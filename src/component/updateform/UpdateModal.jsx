import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Accordions from "../Accordions";
import {
  ModeDropdown,
  AttendanceDropdown,
  StockistDropdown,
} from "../Dropdown";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import UpdateForm from "./Updateform";

export default function UpdateModal({
  open,
  setOpen,
  editData,
  setCloseUpdateform,
}) {
  console.log("editData: ", editData);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { state } = useLocation();
  const [formData, setFormData] = useState(null);
  const [attendance, setAttendance] = useState(formData.attendance);
  const [modeTravel, setModeTravel] = useState(formData.modeTravel);
  const [stockistData, setStockistData] = useState(formData.payer__payerId);
  const [pjpChnage, setPjpChange] = useState(false);
  const [promotionActivity, setPromotionActivity] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [distance, setDistance] = useState(null);

  const expenceId = `${state.data.empId}${dayjs(date.$d).format("YYYY")}${dayjs(
    date.$d
  ).format("MM")}${dayjs(date.$d).format("DD")}`;

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {

    console.log("editData: ", editData);
    console.log("formData1: ", formData);

    console.log("formData: ", {
      ...formData,
      emp: state.data.empId,
      attendance,
      modeTravel,
      payer: stockistData,
      dateExp: dayjs(date).format("DD-MM-YYYY"),
      expenceId,
      distance,
      pjpChnage,
      promotionActivity,
    });

    setOpen(false);
    setFormData(defaultState);
    setAttendance("present");
    setModeTravel("");
    setStockistData("");
    setDistance("");
    setCloseUpdateform((prev) => !prev);

  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="text-center">
          Monthly Expenses
        </DialogTitle>
        <DialogContent>
          {/* <UpdateForm setOpen={setOpen} editData={editData} setCloseUpdateform={setCloseUpdateform} /> */}
          <Box sx={{ flexFlow: 1, padding: 1 }}>
            <div className="grid md:grid-cols-2 place-items-center gap-3 mb-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>

              <AttendanceDropdown
                title="Attendance"
                option={["present", "absent", "MRM"]}
                value={attendance}
                onChange={(e) => setAttendance(e)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <TextField
                type="number"
                fullWidth
                name="tc"
                value={formData.tc}
                onChange={handleFormChange}
                label="TC"
                id="tc"
                size="small"
                disabled={attendance === "absent" ? true : false}
              />
              <TextField
                type="number"
                fullWidth
                name="pc"
                value={formData.pc}
                onChange={handleFormChange}
                label="PC"
                id="pc"
                size="small"
                disabled={attendance === "absent" ? true : false}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <TextField
                type="number"
                fullWidth
                name="sale"
                value={formData.sale}
                onChange={handleFormChange}
                label="SALE"
                size="small"
                disabled={attendance === "absent" ? true : false}
              />
              <TextField
                type="number"
                fullWidth
                name="workingHr"
                value={formData.workingHr}
                onChange={handleFormChange}
                label="WORKING HOURS"
                size="small"
                disabled={attendance === "absent" ? true : false}
              />
              <StockistDropdown
                title="Stockist"
                option={state.stockist}
                value={stockistData}
                onChange={(e) => setStockistData(e)}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <TextField
                type="number"
                fullWidth
                name="townMarketWork"
                value={formData.townMarketWork}
                onChange={handleFormChange}
                label="TOWN AND MARKET"
                size="small"
                disabled={attendance === "absent" ? true : false}
              />
              <TextField
                type="number"
                fullWidth
                name="dailyConv"
                value={
                  attendance === "present" || attendance === "MRM" ? 400 : 0
                }
                onChange={handleFormChange}
                label="D.A."
                size="small"
                disabled={attendance === "absent" ? true : false}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={attendance === "absent" ? true : false}
                      onChange={(e) => setPjpChange(e.target.checked)}
                    />
                  }
                  label="PJP Change?"
                />
              </FormGroup>
            </div>

            <div className="grid mb-4">
              <Accordions
                heading="Travel"
                components={
                  <>
                    <div className="grid md:grid-cols-2 gap-3">
                      <TextField
                        type="number"
                        name="travelSource"
                        value={formData.travelSource}
                        onChange={handleFormChange}
                        fullWidth
                        label="TRAVEL FROM"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="travelDestination"
                        value={formData.travelDestination}
                        onChange={handleFormChange}
                        fullWidth
                        label="TRAVEL TO"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <ModeDropdown
                        title="Mode of Travel"
                        option={["train", "bus", "bike"]}
                        value={modeTravel}
                        onChange={(e) => setModeTravel(e)}
                      />

                      <TextField
                        type="number"
                        name="distance"
                        value={distance}
                        onChange={handleDistanceChange}
                        fullWidth
                        label="ONE SIDE KM"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="localConv"
                        value={distance * 2 * 2}
                        fullWidth
                        label="LOCAL CONV"
                        size="small"
                        disabled={true}
                      />

                      <TextField
                        type="number"
                        name="travelingLong"
                        value={formData.travelingLong}
                        onChange={handleFormChange}
                        fullWidth
                        label="TRAVEL LONG(GST)"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="lodginBoardig"
                        value={formData.lodginBoardig}
                        onChange={handleFormChange}
                        fullWidth
                        label="LODGING BILL"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="nightAllowance"
                        value={formData.nightAllowance}
                        onChange={handleFormChange}
                        fullWidth
                        label="NIGHT TRAVEL ALLOWANCE"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />
                    </div>
                  </>
                }
              />
            </div>

            <div className="grid mb-4">
              <Accordions
                heading="Food"
                components={
                  <>
                    <div className="grid md:grid-cols-2 gap-3 ">
                      <TextField
                        type="number"
                        name="food"
                        value={formData.food}
                        onChange={handleFormChange}
                        fullWidth
                        label="FOOD"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="foodGST"
                        value={formData.foodGST}
                        onChange={handleFormChange}
                        fullWidth
                        label="FOOD GST"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />
                    </div>
                  </>
                }
              />
            </div>

            <div className="grid mb-4">
              <Accordions
                heading="Essentials"
                components={
                  <>
                    <div className="grid md:grid-cols-3 gap-3 ">
                      <TextField
                        type="number"
                        name="internet"
                        value={formData.internet}
                        onChange={handleFormChange}
                        fullWidth
                        label="MOBILE BILL"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="postageCourier"
                        value={formData.postageCourier}
                        onChange={handleFormChange}
                        fullWidth
                        label="COURIER"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="printingStationary"
                        value={formData.printingStationary}
                        onChange={handleFormChange}
                        fullWidth
                        label="STATIONARY"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />
                    </div>
                  </>
                }
              />
            </div>

            <div className="grid mb-4">
              <Accordions
                heading="others"
                components={
                  <>
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <TextField
                        type="number"
                        fullWidth
                        label="OTHER EXP."
                        name="other"
                        value={formData.other}
                        onChange={handleFormChange}
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="otherGst"
                        value={formData.otherGst}
                        onChange={handleFormChange}
                        fullWidth
                        label="OTHERS GST"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />
                    </div>
                  </>
                }
              />
            </div>

            <div className="grid mb-4">
              <Accordions
                heading="Promotion and Activity"
                components={
                  <>
                    <div className="grid md:grid-cols-2 gap-3 ">
                      <TextField
                        type="number"
                        name="openOutlet"
                        value={formData.openOutlet}
                        onChange={handleFormChange}
                        fullWidth
                        label="NEW OUTLET OPENED"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="openTown"
                        value={formData.openTown}
                        onChange={handleFormChange}
                        fullWidth
                        label="NEW TOWN OPENED"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />

                      <TextField
                        type="number"
                        name="poster"
                        value={formData.poster}
                        onChange={handleFormChange}
                        fullWidth
                        label="POSTER ACTIVITY"
                        size="small"
                        disabled={attendance === "absent" ? true : false}
                      />
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={attendance === "absent" ? true : false}
                              onChange={(e) =>
                                setPromotionActivity(e.target.checked)
                              }
                            />
                          }
                          label="Any Promotion Activity?"
                        />
                      </FormGroup>
                    </div>
                  </>
                }
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleFormSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
