import { useState, useRef } from "react";
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
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

export default function UpdateForm({ editData, setCloseUpdateform }) {
  const BASE_URL = "http://64.227.141.209:8080";
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
  const [distance, setDistance] = useState(null);

  const [distanceFile, setDistanceFile] = useState(null);
  const [lodgingBillFile, setLodgingBillFile] = useState(null);
  const [foodFile, setFoodFile] = useState(null);
  const [foodGstFile, setFoodGstFile] = useState(null);
  const [mobileBillFile, setMobileBillFile] = useState(null);
  const [courierBillFile, setCourierBillFile] = useState(null);
  const [stationaryBillFile, setStationaryBillFile] = useState(null);

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

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function UpdateData(updatedata) {
    const id = state?.emp === 'emp' ? state?.empId : data.empId
    console.log("update: ", state)
    const res = await update(
      "/getput",
      id,
      dayjs(date.$d).format("MM"),
      dayjs(date.$d).format("YYYY"),
      data.desig,
      updatedata
    );
    console.log("update: ", res);
  }

  const handleFormSubmit = () => {
    const updatedata = {
      ...formData,
      empId: state.empId,
      attendance,
      modeTravel,
      payer: stockistData,
      dateExp: dayjs(date).format("YYYY-MM-DD"),
      expenseId: state.expenseId,
      distance,
      distanceFile,
      lodgingBillFile,
      foodFile,
      foodGstFile,
      mobileBillFile,
      courierBillFile,
      stationaryBillFile,
      pjpChnage,
      posterActivity
    };

    UpdateData(updatedata);
    navigate("/dashboard", {state: data});
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
            option={["present", "MRM", "Joined Work", "Weekly Off", "leave"]}
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
            disabled={attendance === "leave" ? true : false}
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
            disabled={attendance === "leave" ? true : false}
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
            disabled={attendance === "leave" ? true : false}
          />
          <TextField
            type="number"
            fullWidth
            name="workingHr"
            value={formData.workingHr}
            onChange={handleFormChange}
            label="WORKING HOURS"
            size="small"
            disabled={attendance === "leave" ? true : false}
          />
          <StockistDropdown
            title="Stockist"
            option={stockist}
            value={stockistData}
            onChange={(e) => setStockistData(e)}
          />
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
            disabled={attendance === "leave" ? true : false}
          />
          <TextField
            type="number"
            fullWidth
            name="dailyConv"
            value={formData.dailyConv}
            onChange={handleFormChange}
            label="D.A."
            size="small"
            disabled={attendance === "leave" ? true : false}
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
                      disabled={attendance === "leave" ? true : false}
                    />

                    <TextField
                      type="text"
                      name="travelDestination"
                      value={formData.travelDestination}
                      onChange={handleFormChange}
                      fullWidth
                      label="TRAVEL TO"
                      size="small"
                      disabled={attendance === "leave" ? true : false}
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
                      onChange={handleDistanceChange}
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
                      disabled={attendance === "leave" ? true : false}
                    />

                    <TextField
                      type="number"
                      name="nightAllowance"
                      value={formData.nightAllowance}
                      onChange={handleFormChange}
                      label="NIGHT TRAVEL ALLOWANCE"
                      size="small"
                      disabled={attendance === "leave" ? true : false}
                    />
                  </div>

                  <Box className="flex flex-col items-center md:flex-row gap-2">
                    <Box className="w-full md:w-3/5 flex-1">
                      <TextField
                        type="number"
                        name="distance"
                        value={distance}
                        onChange={handleDistanceChange}
                        fullWidth
                        label="ONE SIDE KM"
                        size="small"
                        disabled={attendance === "leave" ? true : false}
                      />
                    </Box>
                    {distance > 100 ? (
                      <>
                        {distancePreview || editData.distanceFile ? (
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

                        {distancePreview || editData.distanceFile  ? (
                          <IconButton
                            color="primary"
                            size="medium"
                            onClick={async () => {
                              setDistancePreview(null);
                              const res = await imageDelete(
                                "/deleteimage",
                                data.empId,
                                formData.dateExp,
                                "distanceFile"
                              );
                              console.log("delete Distance File: ", res);
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
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
                            className="w-full"
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {distancePreview
                              ? distanceFile?.name
                              : editData.distanceFile}
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
                        disabled={attendance === "leave" ? true : false}
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

                        <IconButton
                          color="primary"
                          size="medium"
                          onClick={async () => {
                            setLodgingPreview(null);
                            const res = await imageDelete(
                              "/deleteimage",
                              data.empId,
                              formData.dateExp,
                              "lodgingBillFile"
                            );
                            console.log("delete loadging File: ", res);
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}

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
                          {lodgingPreview
                            ? lodgingBillFile?.name
                            : editData.lodgingBillFile}
                        </Button>
                      </label>
                    </div>
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
                        disabled={attendance === "leave" ? true : false}
                      />
                    </Box>

                    <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={foodPreview}
                        alt="foodPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <IconButton
                      color="primary"
                      size="medium"
                      onClick={async () => {
                        setFoodPreview(null);
                        const res = await imageDelete(
                          "/deleteimage",
                          data.empId,
                          formData.dateExp,
                          "foodFile"
                        );
                        console.log("delete Food File: ", res);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>

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
                          {foodPreview === null
                            ? "upload files"
                            : editData.foodFile}
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
                        disabled={attendance === "leave" ? true : false}
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

                        <IconButton
                          color="primary"
                          size="medium"
                          onClick={async () => {
                            setFoodGstPreview(null);
                            const res = await imageDelete(
                              "/deleteimage",
                              data.empId,
                              formData.dateExp,
                              "foodGstFile"
                            );
                            console.log("delete FoodGst File: ", res);
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}

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
                          {foodGstPreview
                            ? foodGstFile?.name
                            : editData.foodGstFile}
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
                        disabled={attendance === "leave" ? true : false}
                      />
                    </Box>

                    <div className=" md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={mobileBillPreview}
                        alt="mobileBillPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <IconButton
                      color="primary"
                      size="medium"
                      onClick={async () => {
                        setMobileBillPreview(null);
                        const res = await imageDelete(
                          "/deleteimage",
                          data.empId,
                          formData.dateExp,
                          "mobileBillFile"
                        );
                        console.log("delete mobileBillFile File: ", res);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>

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
                          {mobileBillPreview === null
                            ? mobileBillFile?.file
                            : editData.mobileBillFile}
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
                        disabled={attendance === "leave" ? true : false}
                      />
                    </Box>

                    <div className="md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={courierBillPreview}
                        alt="courierBillPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <IconButton
                      color="primary"
                      size="medium"
                      onClick={async () => {
                        setCourierBillPreview(null);
                        const res = await imageDelete(
                          "/deleteimage",
                          data.empId,
                          formData.dateExp,
                          "courierBillFile"
                        );
                        console.log("delete courierBillFile File: ", res);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>

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
                          {courierBillPreview === null
                            ? courierBillFile.file
                            : editData.courierBillFile}
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
                        disabled={attendance === "leave" ? true : false}
                      />
                    </Box>

                    <div className="md:w-8 md:h-9 border-solid border-2 border-sky-500 rounded flex-1">
                      <img
                        src={stationaryBillPreview}
                        alt="stationaryBillPreview"
                        className="w-full h-full"
                      />
                    </div>

                    <IconButton
                      color="primary"
                      size="medium"
                      onClick={async () => {
                        setStationaryBillPreview(null);
                        const res = await imageDelete(
                          "/deleteimage",
                          data.empId,
                          formData.dateExp,
                          "stationaryBillFile"
                        );
                        console.log("delete stationaryBillFile File: ", res);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>

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
                          {stationaryBillPreview === null
                            ? stationaryBillFile.file
                            : editData.stationaryBillFile}
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
                    disabled={attendance === "leave" ? true : false}
                  />

                  <TextField
                    type="number"
                    name="otherGst"
                    value={formData.otherGst}
                    onChange={handleFormChange}
                    fullWidth
                    label="OTHERS GST"
                    size="small"
                    disabled={attendance === "leave" ? true : false}
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
                        disabled={attendance === "leave" ? true : false}
                        value="yes"
                        label="Yes"
                        control={<Radio />}
                      />
                      <FormControlLabel
                       disabled={attendance === "leave" ? true : false}  
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
            onClick={() => navigate("/dashboard")}
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
