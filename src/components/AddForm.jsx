import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import TextFeild from './TextFeild';
import Dropdown from './Dropdown';
import Accordions from './Accordions';

const AddForm = () => {

  const { state } = useLocation();
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(data)
  }


  return (
    <div className='flex justify-center'>
      <div className='bg-white w-full max-w-5xl md:my-3 rounded px-4 py-2'>
        <form onSubmit={handleSubmit((data) => {
          setData(data);
          console.log("form data: ", data)
          reset();
        })} autoComplete='off'>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              value="date"
              register={register}
              placeholder="DATE"
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
              value="workingHours"
              register={register}
              placeholder="WORKING HOURS"
            />
            <TextFeild
              value="stockest"
              register={register}
              placeholder="NAME OF THE STOCKEST"
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <TextFeild
              value="marketWorked"
              register={register}
              placeholder="TOWN AND MARKET WORKED"
            />
            <TextFeild
              value="travelForm"
              register={register}
              placeholder="TRAVEL FROM"
            />
            <TextFeild
              value="travelTo"
              register={register}
              placeholder="TRAVEL TO"
            />
          </div>

          <div className='grid md:grid-cols-3 gap-3 mb-4'>
            <Dropdown />
            <TextFeild
              value="km"
              register={register}
              placeholder="KM"
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
                  <div className='grid md:grid-cols-3 gap-3 mb-4'>
                    <TextFeild
                      value="marketWorked"
                      register={register}
                      placeholder="TOWN AND MARKET WORKED"
                    />
                    <TextFeild
                      value="travelForm"
                      register={register}
                      placeholder="TRAVEL FROM"
                    />
                    <TextFeild
                      value="travelTo"
                      register={register}
                      placeholder="TRAVEL TO"
                    />
                  </div>

                  <div className='grid md:grid-cols-3 gap-3 mb-4'>
                    <TextFeild
                      value="marketWorked"
                      register={register}
                      placeholder="TOWN AND MARKET WORKED"
                    />
                    <TextFeild
                      value="travelForm"
                      register={register}
                      placeholder="TRAVEL FROM"
                    />
                    <TextFeild
                      value="travelTo"
                      register={register}
                      placeholder="TRAVEL TO"
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
                  <div className='grid md:grid-cols-3 gap-3 mb-4'>
                    <TextFeild
                      value="marketWorked"
                      register={register}
                      placeholder="TOWN AND MARKET WORKED"
                    />
                    <TextFeild
                      value="travelForm"
                      register={register}
                      placeholder="TRAVEL FROM"
                    />
                    <TextFeild
                      value="travelTo"
                      register={register}
                      placeholder="TRAVEL TO"
                    />
                  </div>

                  <div className='grid md:grid-cols-3 gap-3 mb-4'>
                    <TextFeild
                      value="marketWorked"
                      register={register}
                      placeholder="TOWN AND MARKET WORKED"
                    />
                    <TextFeild
                      value="travelForm"
                      register={register}
                      placeholder="TRAVEL FROM"
                    />
                    <TextFeild
                      value="travelTo"
                      register={register}
                      placeholder="TRAVEL TO"
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
                      value="withoutGst"
                      register={register}
                      placeholder="OTHER WITHOUT GST"
                    />
                    <TextFeild
                      value="gst"
                      register={register}
                      placeholder="OTHERS WITH GST"
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