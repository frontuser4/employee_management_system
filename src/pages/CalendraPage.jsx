import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendraPage = () => {
    const [value, onChange] = useState(new Date());
  return (
    <div className='bg-white'>
    <Calendar onChange={onChange} value={value} />
  </div>
  )
}

export default CalendraPage