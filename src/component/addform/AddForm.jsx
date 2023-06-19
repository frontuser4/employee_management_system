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
  const [attendance, setAttendance] = useState('');
  const [modeTravel, setModeTravel] = useState('');
  const [stockistData, setStockistData] = useState('');
  const [date, setDate] = useState(dayjs());
  const expensID = `${state.data.empId}${dayjs(date.$d).format('YYYY')}${dayjs(date.$d).format('MM')}${dayjs(date.$d).format('DD')}`;

  const submitData = async(data) => {
    try {
     const result = await post('/account/expence', data)
     console.log('form-data: ', result);
     toast.success('Added Successfully');
     setOpen(false);
    } catch (error) {
       console.log("error: ", error);
    }
  }

  const handlerChange = (event)=>{
    setFormData((prev)=> ({...prev,  
      expenceId: expensID,
      emp: state.data.empId, 
      dateExp: dayjs(date.$d).format('YYYY-MM-DD'), 
      payer__payerId: stockistData, 
      attendance, 
      modeTravel, 
      [event.target.name]: event.target.value
   }))
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    submitData(formData)
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
            />
            <TextFeild
              names="pc"
              value={formData.pc}
              handlerChange={handlerChange}
              placeholder="PC"
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              names="sale"
              value={formData.sale}
              handlerChange={handlerChange}
              placeholder="SALE"
            />
            <TextFeild
              names="workingHr"
              value={formData.workingHr}
              handlerChange={handlerChange}
              placeholder="WORKING HOURS"
            />
            <StockistDropdown
              title='Stockist'
              option={state.stockist}
              value={stockistData}
              onChange={(e) => setStockistData(e)}
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              names="townMarketWork"
              value={formData.townMarketWork}
              handlerChange={handlerChange}
              placeholder="TOWN AND MARKET WORKED"
            />
            <TextFeild
              names="travelSource"
              value={formData.travelSource}
              handlerChange={handlerChange}
              placeholder="TRAVEL FROM"
            />
            <TextFeild
              names="travelDestination"
              value={formData.travelDestination}
              handlerChange={handlerChange}
              placeholder="TRAVEL TO"
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
            />
            <TextFeild
              names="dailyConveyance"
              value={formData.dailyConveyance}
              handlerChange={handlerChange}
              placeholder="DAILY CONVEYANCE"
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
                    />
                    <TextFeild
                      names="travelingLong"
                      value={formData.travelingLong}
                      handlerChange={handlerChange}
                      placeholder="TRAVELING LONG"
                    />
                    <TextFeild
                      names="lodginBoardig"
                      value={formData.lodginBoardig}
                      handlerChange={handlerChange}
                      placeholder="TRAVELING BOARDING"
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
                    />
                    <TextFeild
                      names="foodGST"
                      value={formData.foodGST}
                      handlerChange={handlerChange}
                      placeholder="FOOD GST"
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
                    />
                    <TextFeild
                      names="postageCourier"
                      value={formData.postageCourier}
                      handlerChange={handlerChange}
                      placeholder="COURIER"
                    />
                    <TextFeild
                      names="printingStationary"
                      value={formData.printingStationary}
                      handlerChange={handlerChange}
                      placeholder="STATIONARY"
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
                    />
                    <TextFeild
                      names="otherGst"
                      value={formData.otherGst}
                      handlerChange={handlerChange}
                      placeholder="OTHERS GST"
                    />
                    <TextFeild
                      names="nightAllowance"
                      value={formData.nightAllowance}
                      handlerChange={handlerChange}
                      placeholder="NIGHT ALLOWANCE"
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