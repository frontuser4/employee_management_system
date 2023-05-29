import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendraPage = () => {
    const [value, onChange] = useState(new Date());
  return (
    <div className='bg-[#0f172a] h-screen flex items-center justify-center'>
      <div className='bg-white'>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  ) 
}

export default CalendraPage