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
  FormControl,
  FormLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import Accordions from "../Accordions";
import {
  ModeDropdown,
  AttendanceDropdown,
  StockistDropdown,
} from "../Dropdown";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { post } from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';

const defaultState = {
  attendance: "",
  tc: "",
  pc: "",
  sale: "",
  approval: "",
  workingHr: "",
  townMarketWork: "",
  dailyConv: "",
  travelSource: "",
  travelDestination: "",
  // distance: "",
  localConv: "",
  travelingLong: "",
  lodginBoardig: "",
  nightAllowance: "",
  food: "",
  foodGST: "",
  internet: "",
  postageCourier: "",
  printingStationary: "",
  other: "",
  otherGst: "",
  poster: "",
};

export default function AddForm({ open, setOpen, setCloseForm }) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {data} = useSelector((state)=> state.login.data);
  const {stockist} = useSelector((state)=> state.login.data);
  const [formData, setFormData] = useState(defaultState);
  const [attendance, setAttendance] = useState("present");
  const [modeTravel, setModeTravel] = useState("");
  const [stockistData, setStockistData] = useState(null);
  const [pjpChnage, setPjpChange] = useState(false);
  const [posterActivity, setPosterActivity] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [distance, setDistance] = useState(null);
  const [dateError, setDateError] = useState(null);

  const [distanceFile, setDistanceFile] = useState(null);
  const [lodgingBillFile, setLodgingBillFile] = useState(null);
  const [foodFile, setFoodFile] = useState(null);
  const [foodGstFile, setFoodGstFile] = useState(null);
  const [mobileBillFile, setMobileBillFile] = useState(null);
  const [courierBillFile, setCourierBillFile] = useState(null);
  const [stationaryBillFile, setStationaryBillFile] = useState(null);

  const [distancePreview, setDistancePreview] = useState(null);
  const [lodgingPreview, setLodgingPreview] = useState(null);
  const [foodPreview, setFoodPreview] = useState(null);
  const [foodGstPreview, setFoodGstPreview] = useState(null);
  const [mobileBillPreview, setMobileBillPreview] = useState(null);
  const [courierBillPreview, setCourierBillPreview] = useState(null);
  const [stationaryBillPreview, setStationaryBillPreview] = useState(null);

  const expenceId = `${data.empId}${dayjs(date.$d).format("YYYY")}${dayjs(
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

  const submitFormDataHandler = async (addData) => {
    try {
      const result = await post("/post", addData);
      console.log("form-data: ", result);
      toast.success(result.data.message);
      setOpen(false);
    } catch (error) {
      setDateError(400);
    }
  };

  const handleFormSubmit = () => {
   
    const addData = {
      ...formData,
      empId: data.empId,
      attendance,
      modeTravel,
      payer: stockistData,
      dateExp: dayjs(date).format("YYYY-MM-DD"),
      expenseId: expenceId,
      distance,
      localConv : distance * 2 * 2,
      pjp : pjpChnage,
      poster : posterActivity,
      distanceFile,
      lodgingBillFile,
      foodFile,
      foodGstFile,
      mobileBillFile,
      courierBillFile,
      stationaryBillFile,
      desig : data.desig,
    };

    submitFormDataHandler(addData);
    setFormData(defaultState);
    setAttendance("present");
    setModeTravel("");
    setStockistData("");
    setDistance("");
    setCloseForm((prev) => !prev);

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
          <Box sx={{ flexFlow: 1, padding: 1 }}>
            <div className="grid md:grid-cols-2 place-items-center gap-3 mb-4">
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  label="Select Date"
                  value={date}
                  onChange={(newDate) =>{
                    setDate(newDate);
                    setDateError(null);
                  } }
                  slotProps={dateError === 400 ? { textField: { helperText:'Date Already Exists, please select another date', size:'small' }} : {textField:{size:'small'}}}
                  sx={{width:'100%'}}
                />
              </LocalizationProvider>

              <AttendanceDropdown
                title="Attendance"
                option={["present", "absent", "MRM", "Joining Date", "Weekly Off", "leave"]}
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
                option={stockist}
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
                value={formData.dailyConv}
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
                    <div className="grid md:grid-cols-1 gap-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <TextField
                          type="text"
                          name="travelSource"
                          value={formData.travelSource}
                          onChange={handleFormChange}
                          fullWidth
                          label="TRAVEL FROM"
                          size="small"
                          disabled={attendance === "absent" ? true : false}
                        />

                        <TextField
                          type="text"
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
                          name="localConv"
                          value={distance * 2 * 2}
                          // onChange={()=> setLocalConv()}
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
                          name="nightAllowance"
                          value={formData.nightAllowance}
                          onChange={handleFormChange}
                          label="NIGHT TRAVEL ALLOWANCE"
                          size="small"
                          disabled={attendance === "absent" ? true : false}
                        />
                      </div>

                      <Box className="flex flex-col items-center md:flex-row gap-2">
                        <Box className="md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="distance"
                            value={distance}
                            onChange={(e)=> setDistance(e.target.value)}
                            fullWidth
                            label="ONE SIDE KM"
                            size="small"
                            disabled={attendance === "absent" ? true : false}
                          />
                        </Box>
                        {distance > 100 ? (
                          <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={distancePreview}
                              alt="distance km"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {distance > 100 ? (
                          <div className="flex-1">
                            {" "}
                            <input
                              type="file"
                              name="distanceBill"
                              id="upload-distance"
                              style={{ display: "none" }}
                              accept=".png, .jpeg, .jpg"
                              onChange={(e) => {
                                setDistanceFile(e.target.files[0]);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setDistancePreview(reader.result);
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }}
                            />
                            <label htmlFor="upload-distance">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                              >
                                {distanceFile
                                  ? distanceFile.name
                                  : "distance BILL"}
                              </Button>
                            </label>
                          </div>
                        ) : (
                          ""
                        )}
                      </Box>

                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="md:w-3/5 flex-1">
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
                        </Box>

                        <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={lodgingPreview}
                            alt="lodging preview"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            name="lodgingBill"
                            id="upload-lodging"
                            style={{ display: "none" }}
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => {
                              setLodgingBillFile(e.target.files[0]);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setLodgingPreview(reader.result);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                          <label htmlFor="upload-lodging">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {lodgingBillFile
                                ? lodgingBillFile.name
                                : "LODGING BILL"}
                            </Button>
                          </label>
                        </div>
                      </Box>
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
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="food"
                            value={formData.food}
                            fullWidth
                            onChange={handleFormChange}
                            label="FOOD"
                            size="small"
                            disabled={attendance === "absent" ? true : false}
                          />
                        </Box>

                        <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={foodPreview}
                            alt="foodPreview"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            name="foodBill"
                            id="upload-foodBill"
                            style={{ display: "none" }}
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => {
                              setFoodFile(e.target.files[0]);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFoodPreview(reader.result);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                          <label htmlFor="upload-foodBill">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {foodFile ? foodFile.name : "Upload Food Bill"}
                            </Button>
                          </label>
                        </div>
                      </Box>

                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="md:w-3/5 flex-1">
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
                        </Box>

                        <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={foodGstPreview}
                            alt="foodPreview"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            name="foodGstBill"
                            id="upload-foodGstBill"
                            style={{ display: "none" }}
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => {
                              setFoodGstFile(e.target.files[0]);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFoodGstPreview(reader.result);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                          <label htmlFor="upload-foodGstBill">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {foodGstFile
                                ? foodGstFile.name
                                : "Upload Food Bill"}
                            </Button>
                          </label>
                        </div>
                      </Box>
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
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="md:w-3/5 flex-1">
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
                        </Box>

                        <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={mobileBillPreview}
                            alt="mobileBillPreview"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            name="internetBill"
                            id="upload-internetBill"
                            style={{ display: "none" }}
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => {
                              setMobileBillFile(e.target.files[0]);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setMobileBillPreview(reader.result);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                          <label htmlFor="upload-internetBill">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {mobileBillFile
                                ? mobileBillFile.name
                                : "MOBILE BILL"}
                            </Button>
                          </label>
                        </div>
                      </Box>

                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="md:w-3/5 flex-1">
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
                        </Box>

                        <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={courierBillPreview}
                            alt="courierBillPreview"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            name="postageCourierBill"
                            id="upload-postageCourierBill"
                            style={{ display: "none" }}
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => {
                              setCourierBillFile(e.target.files[0]);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setCourierBillPreview(reader.result);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                          <label htmlFor="upload-postageCourierBill">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {courierBillFile
                                ? courierBillFile.name
                                : "Courier  Bill"}
                            </Button>
                          </label>
                        </div>
                      </Box>

                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="md:w-3/5 flex-1">
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
                        </Box>

                        <div className="w-8 h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={stationaryBillPreview}
                            alt="stationaryBillPreview"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            type="file"
                            name="stationaryBill"
                            id="upload-stationaryBill"
                            accept=".png, .jpeg, .jpg"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setStationaryBillFile(e.target.files[0]);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setStationaryBillPreview(reader.result);
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                          <label htmlFor="upload-stationaryBill">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {stationaryBillFile
                                ? stationaryBillFile.name
                                : "STATIONARY Bill"}
                            </Button>
                          </label>
                        </div>
                      </Box>
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
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <FormControl>
                        <FormLabel>Poster Activity</FormLabel>
                        <RadioGroup
                          sx={{ display: "inline" }}
                          name="use-radio-group"
                          value={posterActivity}
                          onChange={(e)=> setPosterActivity(e.target.value)}
                        >
                          <FormControlLabel
                            value="yes"
                            label="Yes"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            value="no"
                            label="No"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </FormControl>
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
      <Toaster position="top-center" />
    </div>
  );
}
