import { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from '@mui/material';
import {
  AttendanceDropdown,
  ModeDropdown,
  StockistDropdown,
} from "../Dropdown";
import Accordions from "../Accordions";
import dayjs from "dayjs";
import { update } from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const UpdateForm = ({ setOpen, editData, setCloseUpdateform }) => {
  const { state } = useLocation();
  const [formData, setFormData] = useState(editData);
  const [attendance, setAttendance] = useState(formData.attendance);
  const [modeTravel, setModeTravel] = useState(formData.modeTravel);
  const [stockistData, setStockistData] = useState(formData.payer__payerId);
  const [pjpChnage, setPjpChange] = useState(true);
  const [promotionActivity, setPromotionActivity] = useState(true);
  const [date, setDate] = useState(dayjs(formData.dateExp));
  const expensID = `${state.data.empId}${dayjs(date.$d).format("YYYY")}${dayjs(
    date.$d
  ).format("MM")}${dayjs(date.$d).format("DD")}`;

  const submitData = async () => {
    const data = {
      ...formData,
      expenceId: expensID,
      emp: state.data.empId,
      payer: stockistData,
      attendance,
      modeTravel,
    };

    console.log("updated: ", data);

    try {
      const result = await update("/account/expence", data);
      console.log("form-data: ", result);
      toast.success(result.data.message);
      setOpen(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      expenceId: expensID,
      emp: state.data.empId,
      dateExp: dayjs(date.$d).format("YYYY-MM-DD"),
      payer__payerId: stockistData,
      attendance,
      modeTravel,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    submitData();
    setFormData({});
    setOpen(false);
    setCloseUpdateform((prev) => !prev);
  };

  return (
    // <div className="flex justify-center">
    //   <div className="bg-white w-full max-w-5xl md:my-3 rounded px-4 py-2">
    //     <form onSubmit={submitHandler} autoComplete="off">
    //       <div className="grid md:grid-cols place-items-center mb-4">
    //         <AttendanceDropdown
    //           title="Attendance"
    //           option={["present", "absent", "MRM"]}
    //           value={attendance}
    //           onChange={(e) => setAttendance(e)}
    //         />
    //       </div>

    //       <div className="grid md:grid-cols-2 gap-3 mb-4">
    //         <TextFeild
    //           names="tc"
    //           value={formData.tc}
    //           handleFormChange={handleFormChange}
    //           placeholder="TC"
    //         />
    //         <TextFeild
    //           names="pc"
    //           value={formData.pc}
    //           handleFormChange={handleFormChange}
    //           placeholder="PC"
    //         />
    //       </div>
    //       <div className="grid md:grid-cols-3 gap-3 mb-4">
    //         <TextFeild
    //           names="sale"
    //           value={formData.sale}
    //           handleFormChange={handleFormChange}
    //           placeholder="SALE"
    //         />
    //         <TextFeild
    //           names="workingHr"
    //           value={formData.workingHr}
    //           handleFormChange={handleFormChange}
    //           placeholder="WORKING HOURS"
    //         />
    //         <StockistDropdown
    //           title="Stockist"
    //           option={state.stockist}
    //           value={stockistData}
    //           onChange={(e) => setStockistData(e)}
    //         />
    //       </div>
    //       <div className="grid md:grid-cols-3 gap-3 mb-4">
    //         <TextFeild
    //           names="townMarketWork"
    //           value={formData.townMarketWork}
    //           handleFormChange={handleFormChange}
    //           placeholder="TOWN AND MARKET WORKED"
    //         />
    //         <TextFeild
    //           names="dailyConv"
    //           value={formData.dailyConveyance}
    //           handleFormChange={handleFormChange}
    //           placeholder="D.A."
    //         />
    //         <FormGroup>
    //           <FormControlLabel
    //             control={
    //               <Checkbox onChange={(e) => setPjpChange(e.target.checked)} />
    //             }
    //             label="PJP Change?"
    //           />
    //         </FormGroup>
    //       </div>

    //       <div className="grid mb-4">
    //         <Accordions
    //           heading="Travel"
    //           components={
    //             <>
    //               <div className="grid md:grid-cols-3 gap-3">
    //                 <TextFeild
    //                   names="travelSource"
    //                   value={formData.travelSource}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="TRAVEL FROM"
    //                 />
    //                 <TextFeild
    //                   names="travelDestination"
    //                   value={formData.travelDestination}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="TRAVEL TO"
    //                 />
    //                 <ModeDropdown
    //                   title="Mode of Travel"
    //                   option={["train", "bus", "bike"]}
    //                   value={modeTravel}
    //                   onChange={(e) => setModeTravel(e)}
    //                 />
    //                 <TextFeild
    //                   names="distance"
    //                   value={formData.distance}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="ONE SIDE KM"
    //                 />

    //                 <TextFeild
    //                   names="localConv"
    //                   value={formData.localConv}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="LOCAL CONV"
    //                 />
    //                 <TextFeild
    //                   names="travelingLong"
    //                   value={formData.travelingLong}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="TRAVELING LONG"
    //                 />
    //                 <TextFeild
    //                   names="lodginBoardig"
    //                   value={formData.lodginBoardig}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="TRAVELING BOARDING"
    //                 />
    //               </div>
    //             </>
    //           }
    //         />
    //       </div>

    //       <div className="grid mb-4">
    //         <Accordions
    //           heading="Food"
    //           components={
    //             <>
    //               <div className="grid md:grid-cols-2 gap-3 ">
    //                 <TextFeild
    //                   names="food"
    //                   value={formData.food}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="FOOD"
    //                 />
    //                 <TextFeild
    //                   names="foodGST"
    //                   value={formData.foodGST}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="FOOD GST"
    //                 />
    //               </div>
    //             </>
    //           }
    //         />
    //       </div>

    //       <div className="grid mb-4">
    //         <Accordions
    //           heading="Essentials"
    //           components={
    //             <>
    //               <div className="grid md:grid-cols-3 gap-3 ">
    //                 <TextFeild
    //                   names="internet"
    //                   value={formData.internet}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="MOBILE BILL"
    //                 />
    //                 <TextFeild
    //                   names="postageCourier"
    //                   value={formData.postageCourier}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="COURIER"
    //                 />
    //                 <TextFeild
    //                   names="printingStationary"
    //                   value={formData.printingStationary}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="STATIONARY"
    //                 />
    //               </div>
    //             </>
    //           }
    //         />
    //       </div>

    //       <div className="grid mb-4">
    //         <Accordions
    //           heading="others"
    //           components={
    //             <>
    //               <div className="grid md:grid-cols-3 gap-3 mb-4">
    //                 <TextFeild
    //                   names="other"
    //                   value={formData.other}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="OTHER"
    //                 />
    //                 <TextFeild
    //                   names="otherGst"
    //                   value={formData.otherGst}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="OTHERS GST"
    //                 />
    //                 <TextFeild
    //                   names="nightAllowance"
    //                   value={formData.nightAllowance}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="NIGHT ALLOWANCE"
    //                 />
    //               </div>
    //             </>
    //           }
    //         />
    //       </div>

    //       <div className="grid mb-4">
    //         <Accordions
    //           heading="Promotion and Acitivity"
    //           components={
    //             <>
    //               <div className="grid md:grid-cols-2 gap-3 ">
    //                 <TextFeild
    //                   names="openOutlet"
    //                   value={formData.openOutlet}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="OPEN OUTLET"
    //                 />
    //                 <TextFeild
    //                   names="openOutlet"
    //                   value={formData.openOutlet}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="OPEN OUTLET"
    //                 />
    //                 <TextFeild
    //                   names="poster"
    //                   value={formData.poster}
    //                   handleFormChange={handleFormChange}
    //                   placeholder="POSTER ACTIVITY"
    //                 />
    //                    <FormGroup>
    //                   <FormControlLabel
    //                     control={<Checkbox  onChange={(e)=> setPromotionActivity(e.target.checked)}/>}
    //                     label="Any Promotion Activity?"
    //                   />
    //                 </FormGroup>
    //               </div>
    //             </>
    //           }
    //         />
    //       </div>

    //       <button className="block uppercase shadow bg-teal-600 hover:bg-teal-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    //   <Toaster position="top-right" />
    // </div>
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
  );
};

export default UpdateForm;
