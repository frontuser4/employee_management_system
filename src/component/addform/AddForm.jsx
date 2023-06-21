import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import TextFeild from '../TextFeild';
import { AttendanceDropdown, ModeDropdown, StockistDropdown } from '../Dropdown';
import Accordions from '../Accordions';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { post } from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';

const defaultState = {
  expenceId: "",
  tc: "",
  pc: "",
  dailyConv: "",
  attendance: "",
  dateExp: "",
  sale: "",
  approval: "",
  workingHr: "",
  localConv: "",
  travelingLong: "",
  lodginBoardig: "",
  food: "",
  foodGST: "",
  nightAllowance: "",
  internet: "",
  postageCourier: "",
  printingStationary: "",
  other: "",
  otherGst: "",
  payer__payerId: ""
}

const AddForm = ({setOpen, setCloseForm}) => {
  
  const { state } = useLocation();
  const [formData, setFormData] = useState(defaultState);
  const [attendance, setAttendance] = useState('present');
  const [modeTravel, setModeTravel] = useState('');
  const [stockistData, setStockistData] = useState('');
  const [date, setDate] = useState(dayjs());
  const expensID = `${state.data.empId}${dayjs(date.$d).format('YYYY')}${dayjs(date.$d).format('MM')}${dayjs(date.$d).format('DD')}`;

  const submitData = async() => {
    const data = {
      ...formData,
      expenceId: expensID,
      emp: state.data.empId, 
      dateExp: dayjs(date.$d).format('YYYY-MM-DD'), 
      payer: stockistData, 
      attendance, 
      modeTravel,
    }
    console.log("formdatapost: ", data);
    try {
     const result = await post('/account/expence', data)
     console.log('form-data: ', result);
     toast.success(result.data.message);
     setOpen(false);
    } catch (error) {
       console.log("error: ", error);
    }
  }

  const handlerChange = (event)=>{
    setFormData((prev)=> ({...prev, [event.target.name]: event.target.value}))
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    submitData()
    setFormData({})
    setOpen(false)
    setCloseForm((prev)=> !prev);
  }

  return (
    <div className='flex justify-center'>
      <div className='bg-white w-full max-w-5xl md:my-3 rounded px-4 py-2'>
        <form onSubmit={submitHandler} autoComplete='off'>

          <div className='grid md:grid-cols-2 place-items-center gap-3 mb-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                slotProps={{textField:{size:'small'}}}
              />
            </LocalizationProvider>

            <AttendanceDropdown
              title='Attendance'
              option={['present', 'absent', 'MRM',]}
              value={attendance}
              onChange={(e) => setAttendance(e)}
            />
          </div>

          <div className='grid md:grid-cols-2 gap-3 mb-4'>
            <TextFeild
              names="tc"
              value={formData.tc}
              handlerChange={handlerChange}
              placeholder="TC"
              disable={attendance}
            />
            <TextFeild
              names="pc"
              value={formData.pc}
              handlerChange={handlerChange}
              placeholder="PC"
              disable={attendance}
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              names="sale"
              value={formData.sale}
              handlerChange={handlerChange}
              placeholder="SALE"
              disable={attendance}
            />
            <TextFeild
              names="workingHr"
              value={formData.workingHr}
              handlerChange={handlerChange}
              placeholder="WORKING HOURS"
              disable={attendance}
            />
            <StockistDropdown
              title='Stockist'
              option={state.stockist}
              value={stockistData}
              onChange={(e) => setStockistData(e)}
              disable={attendance}
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              names="townMarketWork"
              value={formData.townMarketWork}
              handlerChange={handlerChange}
              placeholder="TOWN AND MARKET WORKED"
              disable={attendance}
            />
            <TextFeild
              names="travelSource"
              value={formData.travelSource}
              handlerChange={handlerChange}
              placeholder="TRAVEL FROM"
              disable={attendance}
            />
            <TextFeild
              names="travelDestination"
              value={formData.travelDestination}
              handlerChange={handlerChange}
              placeholder="TRAVEL TO"
              disable={attendance}
            />
          </div>

          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <ModeDropdown
              title='Mode of Travel'
              option={['train', 'bus', 'bike']}
              value={modeTravel}
              onChange={(e) => setModeTravel(e)}
            />
            <TextFeild
              names="distance"
              value={formData.distance}
              handlerChange={handlerChange}
              placeholder="ONE SIDE KM"
              disable={attendance}
            />
            <TextFeild
              names="dailyConv"
              value={formData.dailyConveyance}
              handlerChange={handlerChange}
              placeholder="DAILY CONVEYANCE"
              disable={attendance}
            />
          </div>

          <div className='grid mb-4'>
            <Accordions
              heading="Travel"
              components={
                <>
                  <div className='grid md:grid-cols-3 gap-3'>

                    <TextFeild
                      names="localConv"
                      value={formData.localConv}
                      handlerChange={handlerChange}
                      placeholder="LOCAL CONV"
                      disable={attendance}
 
                    />
                    <TextFeild
                      names="travelingLong"
                      value={formData.travelingLong}
                      handlerChange={handlerChange}
                      placeholder="TRAVELING LONG"
                      disable={attendance}

                    />
                    <TextFeild
                      names="lodginBoardig"
                      value={formData.lodginBoardig}
                      handlerChange={handlerChange}
                      placeholder="TRAVELING BOARDING"
                      disable={attendance}
                    />
                  </div>
                </>
              }
            />
          </div>

          <div className='grid mb-4'>
            <Accordions
              heading="Food"
              components={
                <>
                  <div className='grid md:grid-cols-2 gap-3 '>
                    <TextFeild
                      names="food"
                      value={formData.food}
                      handlerChange={handlerChange}
                      placeholder="FOOD"
                      disable={attendance}
                    />
                    <TextFeild
                      names="foodGST"
                      value={formData.foodGST}
                      handlerChange={handlerChange}
                      placeholder="FOOD GST"
                      disable={attendance}

                    />
                  </div>
                </>
              }
            />
          </div>

          <div className='grid mb-4'>
            <Accordions
              heading="Essentials"
              components={
                <>
                  <div className='grid md:grid-cols-3 gap-3 '>
                    <TextFeild
                      names="internet"
                      value={formData.internet}
                      handlerChange={handlerChange}
                      placeholder="INTERNET"
                      disable={attendance}
                    />
                    <TextFeild
                      names="postageCourier"
                      value={formData.postageCourier}
                      handlerChange={handlerChange}
                      placeholder="COURIER"
                      disable={attendance}

                    />
                    <TextFeild
                      names="printingStationary"
                      value={formData.printingStationary}
                      handlerChange={handlerChange}
                      placeholder="STATIONARY"
                      disable={attendance}

                    />
                  </div>
                </>
              }
            />
          </div>

          <div className='grid mb-4'>
            <Accordions
              heading="Promotion and Expension"
              components={
                <>
                  <div className='grid md:grid-cols-3 gap-3 '>
                    <TextFeild
                      names="poster"
                      value={formData.poster}
                      handlerChange={handlerChange}
                      placeholder="POSTER ACTIVITY"
                      disable={attendance}
                    />
                    <TextFeild
                      names="openOutlet"
                      value={formData.openOutlet}
                      handlerChange={handlerChange}
                      placeholder="NEW OUTLET OPENED"
                      disable={attendance}
                    />
                    <TextFeild
                      names="openTown"
                      value={formData.openTown}
                      handlerChange={handlerChange}
                      placeholder="NEW TOWN OPENED"
                      disable={attendance}
                    />
                  </div>
                </>
              }
            />
          </div>

          <div className='grid mb-4'>
            <Accordions
              heading="others"
              components={
                <>
                  <div className='grid md:grid-cols-3 gap-3 mb-4'>
                    <TextFeild
                      names="other"
                      value={formData.other}
                      handlerChange={handlerChange}
                      placeholder="OTHER"
                      disable={attendance}

                    />
                    <TextFeild
                      names="otherGst"
                      value={formData.otherGst}
                      handlerChange={handlerChange}
                      placeholder="OTHERS GST"
                      disable={attendance}

                    />
                    <TextFeild
                      names="nightAllowance"
                      value={formData.nightAllowance}
                      handlerChange={handlerChange}
                      placeholder="NIGHT ALLOWANCE"
                      disable={attendance}

                    />
                  </div>
                </>
              }
            />
          </div>

          <button className="block uppercase shadow bg-teal-600 hover:bg-teal-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">Submit</button>
        </form>
      </div>
      <Toaster  position="top-right" />
    </div>
  )
}

export default AddForm;