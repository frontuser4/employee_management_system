import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import TextFeild from './TextFeild';
import Dropdown, {AttendanceDropdown, ModeDropdown} from './Dropdown';

import Accordions from './Accordions';
import axios from 'axios';
import dayjs from 'dayjs';
// axios.defaults.headers.common['Authorization'] = `Token e6c9d81a9238dee3f44bcb132dd7f91cf4ec1c95`;
axios.defaults.headers.common['Authorization'] = `jhsajdkhsakdjhsdjakjdhsajdsd`;
const url = 'http://142.93.208.119:8000/account/expence';

const AddForm = ({calendarValue, empId, stockist}) => {
  
  const { state } = useLocation();
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");
  const [attendance, setAttendance] = useState('');
  const [modeTravel, setModeTravel] = useState('');
  const [stockistData, setStockistData ] = useState('');
  const expensID = `${empId}${dayjs(calendarValue).format('YYYY')}${dayjs(calendarValue).format('MM')}${dayjs(calendarValue).format('DD')}`;

  const submitData = (data, url) => {
    axios.post(url, data).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='flex justify-center'>
      <div className='bg-white w-full max-w-5xl md:my-3 rounded px-4 py-2'>
        <form onSubmit={handleSubmit((data) => {
          setData(data);
          submitData({expId: expensID, empId:empId, dateExp: calendarValue, stockist: stockistData, attendance, modeTravel, ...data}, url);
          reset();
        })} autoComplete='off'>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <AttendanceDropdown
              title='Attendance'
              option={['present', 'absent', 'MRM', ]}
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <TextFeild
              value="tc"
              register={register}
              placeholder="TC"
            />
            <TextFeild
              value="pc"
              register={register}
              placeholder="PC"
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              value="sale"
              register={register}
              placeholder="SALE"
            />
            <TextFeild
              value="workingHr"
              register={register}
              placeholder="WORKING HOURS"
            />
            <Dropdown
              title='Stockist'
              option={stockist}
              value={stockistData}
              onChange={(e) => setStockistData(e.target.value)}
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              value="townMarketWork"
              register={register}
              placeholder="TOWN AND MARKET WORKED"
            />
            <TextFeild
              value="travelSource"
              register={register}
              placeholder="TRAVEL FROM"
            />
            <TextFeild
              value="travelDestination"
              register={register}
              placeholder="TRAVEL TO"
            />
          </div>

          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <ModeDropdown
              title='Mode of Travel'
              option={['train', 'bus', 'bike']}
              value={modeTravel}
              onChange={(e) => setModeTravel(e.target.value)}
            />
            <TextFeild
              value="distance"
              register={register}
              placeholder="ONE SIDE KM"
            />
            <TextFeild
              value="dailyConveyance"
              register={register}
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
                      value="localConv"
                      register={register}
                      placeholder="localConv"
                    />
                    <TextFeild
                      value="travelingLong"
                      register={register}
                      placeholder="TRAVELING LONG"
                    />
                     <TextFeild
                      value="lodginBoardig"
                      register={register}
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
                      value="food"
                      register={register}
                      placeholder="FOOD"
                    />
                    <TextFeild
                      value="foodGST"
                      register={register}
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
                      value="internet"
                      register={register}
                      placeholder="INTERNET"
                    />
                    <TextFeild
                      value="postageCourier"
                      register={register}
                      placeholder="COURIER"
                    />
                    <TextFeild
                      value="printingStationary"
                      register={register}
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
                      value="other"
                      register={register}
                      placeholder="OTHER"
                    />
                    <TextFeild
                      value="otherGst"
                      register={register}
                      placeholder="OTHERS GST"
                    />
                    <TextFeild
                      value="nightAllowance"
                      register={register}
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
    </div>
  )
}

export default AddForm;