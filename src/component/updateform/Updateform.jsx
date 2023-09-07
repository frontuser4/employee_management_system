import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
  Tooltip,
} from "@mui/material";
import Accordions from "../Accordions";
import {
  ModeDropdown,
  AttendanceDropdown,
  StockistDropdown,
} from "../Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { update, imageDelete } from "../../utils/api";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";

export default function UpdateForm({ editData, setCloseUpdateform }) {
  const BASE_URL = "http://64.227.141.209:8080";
  // const BASE_URL = "http://192.168.0.120:8000";

  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useSelector((state) => state.login.data);
  const { stockist } = useSelector((state) => state.login.data);
  const [formData, setFormData] = useState(editData);
  const [attendance, setAttendance] = useState(formData.attendance);
  const [modeTravel, setModeTravel] = useState(formData.modeTravel);
  const [stockistData, setStockistData] = useState();
  const [pjpChnage, setPjpChange] = useState(false);
  const [posterActivity, setPosterActivity] = useState(null);
  const [date, setDate] = useState(dayjs(state.dateExp));
  const [distance, setDistance] = useState(formData.distance);
  const [localConv, setLocalConv] = useState(null);

  const [distanceFile, setDistanceFile] = useState(null);
  const [lodgingBillFile, setLodgingBillFile] = useState(null);
  const [foodFile, setFoodFile] = useState(null);
  const [foodGstFile, setFoodGstFile] = useState(null);
  const [mobileBillFile, setMobileBillFile] = useState(null);
  const [courierBillFile, setCourierBillFile] = useState(null);
  const [stationaryBillFile, setStationaryBillFile] = useState(null);
  const [empId, setEmpId] = useState(null);

  const [distancePreview, setDistancePreview] = useState(
    `${BASE_URL}${editData.distanceFile}`
  );

  const [lodgingPreview, setLodgingPreview] = useState(
    `${BASE_URL}${editData.lodgingBillFile}`
  );

  const [foodPreview, setFoodPreview] = useState(
    `${BASE_URL}${editData.foodFile}`
  );
  const [foodGstPreview, setFoodGstPreview] = useState(
    `${BASE_URL}${editData.foodGstFile}`
  );
  const [mobileBillPreview, setMobileBillPreview] = useState(
    `${BASE_URL}${editData.mobileBillFile}`
  );
  const [courierBillPreview, setCourierBillPreview] = useState(
    `${BASE_URL}${editData.courierBillFile}`
  );
  const [stationaryBillPreview, setStationaryBillPreview] = useState(
    `${BASE_URL}${editData.stationaryBillFile}`
  );

  const expenceId = `${data.empId}${dayjs(date.$d).format("YYYY")}${dayjs(
    date.$d
  ).format("MM")}${dayjs(date.$d).format("DD")}`;

  useEffect(() => {
    if (state?.emp === "emp") {
      setEmpId(state.empId);
    } else {
      setEmpId(data.empId);
    }
  }, []);

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function UpdateData(updatedata) {
    const id = state?.emp === "emp" ? state?.empId : data.empId;

    try {
      const res = await update(
        "/web/getexpense",
        id,
        dayjs(date.$d).format("MM"),
        dayjs(date.$d).format("YYYY"),
        data.empGroup,
        updatedata
      );
      if (res.status === 200) {
        toast.success("expence update successfully");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.success(error.response.data.error);
      }
      console.log("update form error: ", error);
    }
  }

  const handleFormSubmit = () => {
    const { emp, empDesig, empId, empLevel, expenseId, empHq, empName } = state;
    let id;
    let desig;
    let level;
    let expId;

    if (emp === "emp") {
      id = empId;
      desig = empDesig;
      level = empLevel;
      expId = expenseId;
    } else {
      id = data.empId;
      desig = data.desig;
      level = data.empGroup;
      expId = expenceId;
    }

    let local = distance <= 100 ? distance * 2 * 2 : localConv;

    const updatedata = {
      ...formData,
      empId: id,
      attendance,
      modeTravel,
      payer: stockistData,
      dateExp: dayjs(date).format("YYYY-MM-DD"),
      expenseId: expId,
      distance,
      localConv: local,
      distanceFile,
      lodgingBillFile,
      foodFile,
      foodGstFile,
      mobileBillFile,
      courierBillFile,
      stationaryBillFile,
      pjpChnage,
      posterActivity,
      empLevel: level,
    };

    UpdateData(updatedata);
    navigate("/dashboard/expense", {
      state: { emp, empDesig, empId, empLevel, expenseId, empHq, empName },
    });

    setAttendance("PRESENT");
    setModeTravel("");
    setStockistData("");
    setDistance("");
    setCloseUpdateform((prev) => !prev);
  };


  return (
    <>
      <Box sx={{ flexFlow: 1, padding: 1 }} m={{ sm: 4, md: 10 }} mt={8}>
        <div className="grid md:grid-cols-2 place-items-center gap-3 mb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              slotProps={{ textField: { size: "small" } }}
              sx={{ width: "100%" }}
              disabled={true}
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
              ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
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
              ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
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
              ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
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
            disabled={true}
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
                ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
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
                ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
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
              ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
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
              ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(attendance)
                ? true
                : false
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
                        ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                          attendance
                        )
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
                        ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                          attendance
                        )
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
                        ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                          attendance
                        )
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
                        onChange={(e) => {
                          setLocalConv(e.target.value);
                        }}
                        fullWidth
                        label="LOCAL CONV"
                        size="small"
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
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
                        ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                          attendance
                        )
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
                        ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                          attendance
                        )
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>
                    {distance >= 100 ? (
                      <>
                        {distancePreview || formData.distanceFile ? (
                          <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                            <img
                              src={distancePreview}
                              alt="distance km"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <></>
                        )}

                        {distancePreview || editData.distanceFile ? (
                          <Tooltip title="delete image" placement="top">
                            <IconButton
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
                              color="error"
                              size="medium"
                              onClick={async () => {
                                setDistancePreview(null);
                                const res = await imageDelete(
                                  "/web/deleteimage",
                                  empId,
                                  formData.dateExp,
                                  "distanceFile"
                                );
                                console.log("delete Distance File: ", res);
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {distance >= 100 ? (
                      <Tooltip title="upload images" placement="top">
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
                              fullWidth
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                            >
                              {distancePreview
                                ? distanceFile?.name
                                : "upload images"}
                            </Button>
                          </label>
                        </div>
                      </Tooltip>
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>

                    {lodgingPreview ? (
                      <>
                        <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={lodgingPreview}
                            alt="lodging preview"
                            className="w-full h-full"
                          />
                        </div>

                        <Tooltip title="delete image" placement="top">
                          <IconButton
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
                            color="error"
                            size="medium"
                            onClick={async () => {
                              setLodgingPreview(null);
                              const res = await imageDelete(
                                "/web/deleteimage",
                                empId,
                                formData.dateExp,
                                "lodgingBillFile"
                              );
                              console.log("delete loadging File: ", res);
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <></>
                    )}

                    <Tooltip title="upload images" placement="top">
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {lodgingPreview
                              ? lodgingBillFile?.name
                              : "upload images"}
                          </Button>
                        </label>
                      </div>
                    </Tooltip>
                  </Box>
                </div>
              </>
            }
          />
        </div>

        {/* Food */}
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>

                    <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={foodPreview}
                        alt="foodPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <Tooltip title="delete image" placement="top">
                      <IconButton
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                        color="error"
                        size="medium"
                        onClick={async () => {
                          setFoodPreview(null);
                          const res = await imageDelete(
                            "/web/deleteimage",
                            empId,
                            formData.dateExp,
                            "foodFile"
                          );
                          console.log("delete Food File: ", res);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="upload images" placement="top">
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {foodPreview ? foodFile?.name : "upload images"}
                          </Button>
                        </label>
                      </div>
                    </Tooltip>
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>

                    {foodGstPreview ? (
                      <>
                        <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                          <img
                            src={foodGstPreview}
                            alt="foodPreview"
                            className="w-full h-full"
                          />
                        </div>

                        <Tooltip title="delete images" placement="top">
                          <IconButton
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
                            color="error"
                            size="medium"
                            onClick={async () => {
                              setFoodGstPreview(null);
                              const res = await imageDelete(
                                "/web/deleteimage",
                                empId,
                                formData.dateExp,
                                "foodGstFile"
                              );
                              console.log("delete FoodGst File: ", res);
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <></>
                    )}

                    <Tooltip title="upload images" placement="top">
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {foodGstPreview
                              ? foodGstFile?.name
                              : "upload images"}
                          </Button>
                        </label>
                      </div>
                    </Tooltip>
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>

                    <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={mobileBillPreview}
                        alt="mobileBillPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <Tooltip title="delete images" placement="top">
                      <IconButton
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                        color="error"
                        size="medium"
                        onClick={async () => {
                          setMobileBillPreview(null);
                          const res = await imageDelete(
                            "/web/deleteimage",
                            empId,
                            formData.dateExp,
                            "mobileBillFile"
                          );
                          console.log("delete mobileBillFile File: ", res);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>

                    <div className="flex-1">
                      <input
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
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
                          fullWidth
                          variant="contained"
                          color="primary"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                        >
                          {mobileBillPreview
                            ? mobileBillFile?.name
                            : "upload files"}
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>

                    <div className="md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={courierBillPreview}
                        alt="courierBillPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <Tooltip title="delete images" placement="top">
                      <IconButton
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                        color="error"
                        size="medium"
                        onClick={async () => {
                          setCourierBillPreview(null);
                          const res = await imageDelete(
                            "/web/deleteimage",
                            empId,
                            formData.dateExp,
                            "courierBillFile"
                          );
                          console.log("delete courierBillFile File: ", res);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="upload images" placement="top">
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {courierBillPreview
                              ? courierBillFile?.name
                              : "upload image"}
                          </Button>
                        </label>
                      </div>
                    </Tooltip>
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                      />
                    </Box>

                    <div className="md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={stationaryBillPreview}
                        alt="stationaryBillPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <Tooltip title="delete images" placement="top">
                      <IconButton
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                        color="error"
                        size="medium"
                        onClick={async () => {
                          setStationaryBillPreview(null);
                          const res = await imageDelete(
                            "/web/deleteimage",
                            empId,
                            formData.dateExp,
                            "stationaryBillFile"
                          );
                          console.log("delete stationaryBillFile File: ", res);
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="upload images" placement="top">
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {stationaryBillPreview
                              ? stationaryBillFile?.name
                              : "upload image"}
                          </Button>
                        </label>
                      </div>
                    </Tooltip>
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
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
                            ? true
                            : false
                        }
                        value="yes"
                        label="Yes"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        disabled={
                          ["LEAVE", "WEEKLY OFF", "HOLIDAY", "C/OFF"].includes(
                            attendance
                          )
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

        <div className="flex gap-4 items-center">
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/expense")}
            autoFocus
          >
            Back
          </Button>
          <Button variant="contained" onClick={handleFormSubmit} autoFocus>
            Update
          </Button>
        </div>
      </Box>
    </>
  );
}
