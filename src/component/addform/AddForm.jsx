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
import { useSelector } from "react-redux";

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
  // localConv: "",
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

export default function AddForm({ open, setOpen, setCloseForm, empData }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useSelector((state) => state.login.data);
  const { stockist } = useSelector((state) => state.login.data);
  const [formData, setFormData] = useState(defaultState);
  const [attendance, setAttendance] = useState("PRESENT");
  const [modeTravel, setModeTravel] = useState("");
  const [stockistData, setStockistData] = useState(null);
  const [pjpChnage, setPjpChange] = useState(false);
  const [posterActivity, setPosterActivity] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [distance, setDistance] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [localConv, setLocalConv] = useState(null);

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
    setDistancePreview(null);
    setLodgingPreview(null);
    setFoodPreview(null);
    setFoodGstPreview(null);
    setMobileBillPreview(null);
    setCourierBillPreview(null);
    setStationaryBillPreview(null);

    setDistanceFile(null);
    setLodgingBillFile(null);
    setFoodFile(null);
    setFoodGstFile(null);
    setMobileBillFile(null);
    setCourierBillFile(null);
    setStationaryBillFile(null);
    setFormData(defaultState);
    setDistance(null);
    setModeTravel("");
    setStockistData(null);
    setPosterActivity(null);
  };

  const handleFormChange = (event) => {
    console.log("handle form change: ", {[event.target.name]: event.target.value})
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitFormDataHandler = async (addData) => {
    try {
      const result = await post("/web/postexpense", addData);
      toast.success(result.data.message);
      setOpen(false);
    } catch (error) {
      console.log("date error: ", error);
      toast.error("Date Already Exists, please select another date");
      setDateError(400);
    }
  };

  const handleFormSubmit = () => {
    let level;
    let id;
    let expId;
    let desig;
    if (empData && empData.emp !== undefined) {
      level = empData ? empData.empLevel : data.empGroup;
      id = empData ? empData.empId : data.empId;
      expId = empData
        ? `${empData.empId}${dayjs(date.$d).format("YYYY")}${dayjs(
            date.$d
          ).format("MM")}${dayjs(date.$d).format("DD")}`
        : expenceId;
      desig = empData ? empData.empDesig : data.desig;
    } else {
      level = data.empGroup;
      id = data.empId;
      expId = expenceId;
      desig = data.desig;
    }
   
    let local = distance <= 100 ? distance * 2 * 2 : localConv;

    const addData = {
      ...formData,
      empId: id,
      attendance,
      modeTravel,
      payer: stockistData,
      dateExp: dayjs(date).format("YYYY-MM-DD"),
      expenseId: expId,
      distance,
      pjp: pjpChnage,
      poster: posterActivity,
      localConv: local,
      distanceFile,
      lodgingBillFile,
      foodFile,
      foodGstFile,
      mobileBillFile,
      courierBillFile,
      stationaryBillFile,
      desig: desig,
      empLevel: level,
    };

    submitFormDataHandler(addData);
    setFormData(defaultState);
    setAttendance("PRESENT");
    setModeTravel("");
    setStockistData("");
    setDistance(null);
    setLocalConv(null);
    setCloseForm((prev) => !prev);

    setDistancePreview(null);
    setLodgingPreview(null);
    setFoodPreview(null);
    setFoodGstPreview(null);
    setMobileBillPreview(null);
    setCourierBillPreview(null);
    setStationaryBillPreview(null);

    setDistanceFile(null);
    setLodgingBillFile(null);
    setFoodFile(null);
    setFoodGstFile(null);
    setMobileBillFile(null);
    setCourierBillFile(null);
    setStationaryBillFile(null);
    setPosterActivity(null);
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                    setDateError(null);
                  }}
                  slotProps={
                    dateError === 400
                      ? {
                          textField: {
                            helperText:
                              "Date Already Exists, please select another date",
                            size: "small",
                          },
                        }
                      : { textField: { size: "small" } }
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>

              <AttendanceDropdown
                title="Attendance"
                option={[
                  "PRESENT",
                  "MRM",
                  "JOINED WORK",
                  "WEEKLY OFF",
                  "HOLIDAY",
                  "C/OFF",
                  "LEAVE",
                ]}
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
                disabled={
                  ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                    attendance
                  )
                    ? true
                    : false
                }
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
                disabled={
                  ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                    attendance
                  )
                    ? true
                    : false
                }
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
                disabled={
                  ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                    attendance
                  )
                    ? true
                    : false
                }
              />
              <TextField
                type="number"
                fullWidth
                name="workingHr"
                value={formData.workingHr}
                onChange={handleFormChange}
                label="WORKING HOURS"
                size="small"
                disabled={
                 true
                }
              />
              {data.desig === "RMS" ? (
                <TextField
                  type="text"
                  fullWidth
                  value={stockistData}
                  onChange={(e) => setStockistData(e.target.value)}
                  label="STOCKIST"
                  size="small"
                  disabled={
                    ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                      attendance
                    )
                      ? true
                      : false
                  }
                />
              ) : (
                <StockistDropdown
                  title="Stockist"
                  option={stockist}
                  value={stockistData}
                  onChange={(e) => setStockistData(e)}
                  disabled={
                    ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                      attendance
                    )
                      ? true
                      : false
                  }
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <TextField
                type="text"
                fullWidth
                name="townMarketWork"
                value={formData.townMarketWork}
                onChange={handleFormChange}
                label="TOWN AND MARKET"
                size="small"
                disabled={
                  ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                    attendance
                  )
                    ? true
                    : false
                }
              />
              <TextField
                type="number"
                fullWidth
                name="dailyConv"
                value={formData.dailyConv}
                onChange={handleFormChange}
                label="D.A."
                size="small"
                disabled={
                  ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                    attendance
                  )
                    ? true
                    : false
                }
              />
            </div>

            {/* PJP Change */}
            <div className="grid mb-4">
              <Accordions
                heading="PJP Change"
                components={
                  <>
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <FormControl>
                        <FormLabel>PJP Change?</FormLabel>
                        <RadioGroup
                          sx={{ display: "inline" }}
                          name="use-radio-group"
                          value={pjpChnage}
                          onChange={(e) => setPjpChange(e.target.value)}
                        >
                          <FormControlLabel
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                            value="yes"
                            label="Yes"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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

            {/* Travel */}
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
                          disabled={
                            [
                              "LEAVE",
                              "WEEKLY OFF",
                              "HOLIDAY",
                              "C/OFF",
                            ].includes(attendance)
                              ? true
                              : false
                          }
                        />

                        <TextField
                          type="text"
                          name="travelDestination"
                          value={formData.travelDestination}
                          onChange={handleFormChange}
                          fullWidth
                          label="TRAVEL TO"
                          size="small"
                          disabled={
                            [
                              "LEAVE",
                              "WEEKLY OFF",
                              "HOLIDAY",
                              "C/OFF",
                            ].includes(attendance)
                              ? true
                              : false
                          }
                        />

                        <ModeDropdown
                          title="Mode of Travel"
                          option={["train", "bus", "bike"]}
                          value={modeTravel}
                          onChange={(e) => setModeTravel(e)}
                          disabled={
                            [
                              "LEAVE",
                              "WEEKLY OFF",
                              "HOLIDAY",
                              "C/OFF",
                            ].includes(attendance)
                              ? true
                              : false
                          }
                        />

                        {distance <= 100 ? (
                          <p className="text-lg flex items-center justify-center border-gray-200 w-full bg-slate-100">
                           LocalConv: {distance * 2 * 2}
                          </p>
                        ) : (
                          <TextField
                            type="number"
                            value={localConv}
                            onChange={(e)=> {
                              setLocalConv(e.target.value)
                            }}
                            fullWidth
                            label="LOCAL CONV"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        )}

                        <TextField
                          type="number"
                          name="travelingLong"
                          value={formData.travelingLong}
                          onChange={handleFormChange}
                          fullWidth
                          label="TRAVEL LONG(GST)"
                          size="small"
                          disabled={
                            [
                              "LEAVE",
                              "WEEKLY OFF",
                              "HOLIDAY",
                              "C/OFF",
                            ].includes(attendance)
                              ? true
                              : false
                          }
                        />

                        <TextField
                          type="number"
                          name="nightAllowance"
                          value={formData.nightAllowance}
                          onChange={handleFormChange}
                          label="NIGHT TRAVEL ALLOWANCE"
                          size="small"
                          disabled={
                            [
                              "LEAVE",
                              "WEEKLY OFF",
                              "HOLIDAY",
                              "C/OFF",
                            ].includes(attendance)
                              ? true
                              : false
                          }
                        />
                      </div>

                      <Box className="flex flex-col items-center md:flex-row gap-2">
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            fullWidth
                            label="ONE SIDE KM"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>
                        {distance > 100 ? (
                          <>
                            {distancePreview !== null ? (
                              <div className=" w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                                <img
                                  src={distancePreview}
                                  alt="distance km"
                                  className="w-full h-full"
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        {distance > 100 ? (
                          <div className="flex-1">
                            {" "}
                            <input
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
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
                              required
                            />
                            <label htmlFor="upload-distance">
                              <Button
                                disabled={
                                  [
                                    "LEAVE",
                                    "WEEKLY OFF",
                                    "HOLIDAY",
                                    "C/OFF",
                                  ].includes(attendance)
                                    ? true
                                    : false
                                }
                                className="w-full"
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
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="lodginBoardig"
                            value={formData.lodginBoardig}
                            onChange={handleFormChange}
                            fullWidth
                            label="LODGING BILL"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>

                        {lodgingPreview !== null ? (
                          <div className="w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={lodgingPreview}
                              alt="lodging preview"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="flex-1">
                          <input
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
                            required
                          />
                          <label htmlFor="upload-lodging">
                            <Button
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
                              className="w-full"
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

            {/* food */}
            <div className="grid mb-4">
              <Accordions
                heading="Food"
                components={
                  <>
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="food"
                            value={formData.food}
                            fullWidth
                            onChange={handleFormChange}
                            label="FOOD"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>

                        {foodPreview !== null ? (
                          <div className="w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={foodPreview}
                              alt="foodPreview"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="flex-1">
                          <input
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
                            required
                          />
                          <label htmlFor="upload-foodBill">
                            <Button
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
                              className="w-full"
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
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="foodGST"
                            value={formData.foodGST}
                            onChange={handleFormChange}
                            fullWidth
                            label="FOOD GST"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>

                        {foodGstPreview !== null ? (
                          <div className="w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={foodGstPreview}
                              alt="foodPreview"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="flex-1">
                          <input
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
                            required
                          />
                          <label htmlFor="upload-foodGstBill">
                            <Button
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
                              className="w-full"
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

            {/* Essentials */}
            <div className="grid mb-4">
              <Accordions
                heading="Essentials"
                components={
                  <>
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <Box className="flex flex-col md:flex-row gap-2 items-center">
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="internet"
                            value={formData.internet}
                            onChange={handleFormChange}
                            fullWidth
                            label="MOBILE BILL"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>

                        {mobileBillPreview !== null ? (
                          <div className=" w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={mobileBillPreview}
                              alt="mobileBillPreview"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="flex-1">
                          <input
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
                            required
                          />
                          <label htmlFor="upload-internetBill">
                            <Button
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
                              className="w-full"
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
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="postageCourier"
                            value={formData.postageCourier}
                            onChange={handleFormChange}
                            fullWidth
                            label="COURIER"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>

                        {courierBillPreview !== null ? (
                          <div className=" w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={courierBillPreview}
                              alt="courierBillPreview"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="flex-1">
                          <input
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
                            required
                          />
                          <label htmlFor="upload-postageCourierBill">
                            <Button
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
                              className="w-full"
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
                        <Box className="w-full md:w-3/5 flex-1">
                          <TextField
                            type="number"
                            name="printingStationary"
                            value={formData.printingStationary}
                            onChange={handleFormChange}
                            fullWidth
                            label="STATIONARY"
                            size="small"
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                          />
                        </Box>
                        {stationaryBillPreview !== null ? (
                          <div className=" w-full md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={stationaryBillPreview}
                              alt="stationaryBillPreview"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="flex-1">
                          <input
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
                            required
                          />
                          <label htmlFor="upload-stationaryBill">
                            <Button
                              disabled={
                                [
                                  "LEAVE",
                                  "WEEKLY OFF",
                                  "HOLIDAY",
                                  "C/OFF",
                                ].includes(attendance)
                                  ? true
                                  : false
                              }
                              className="w-full"
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

            {/* others */}
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
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />

                      <TextField
                        type="number"
                        name="otherGst"
                        value={formData.otherGst}
                        onChange={handleFormChange}
                        fullWidth
                        label="OTHERS GST"
                        size="small"
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </div>
                  </>
                }
              />
            </div>

            {/* Poster and Activity */}
            <div className="grid mb-4">
              <Accordions
                heading="Poster and Activity"
                components={
                  <>
                    <div className="grid md:grid-cols-1 gap-3 ">
                      <FormControl>
                        <FormLabel>Poster Activity</FormLabel>
                        <RadioGroup
                          sx={{ display: "inline" }}
                          name="use-radio-group"
                          value={posterActivity}
                          onChange={(e) => setPosterActivity(e.target.value)}
                        >
                          <FormControlLabel
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
                            value="yes"
                            label="Yes"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={
                              [
                                "LEAVE",
                                "WEEKLY OFF",
                                "HOLIDAY",
                                "C/OFF",
                              ].includes(attendance)
                                ? true
                                : false
                            }
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
        <Toaster position="top-center" />
      </Dialog>
    </div>
  );
}
