import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Dropdown = ({title, option, value, onChange}) => {
  return (
    <div>
        <select id="countries" defaultValue="stockist name" value={value} onChange={onChange} className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>{title}</option>
        {
          option?.map((data, index)=>{
            return <option key={index} value={data.payerId} >[{data.payerId}] {data.stokist_name}</option>
          })
        }
    </select>
    </div>
  )
}

const AttendanceDropdown = ({title, option, value, onChange})=>{
  return (
    <div>
        <select id="countries" defaultValue="attendance"  value={value} onChange={onChange} className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>{title}</option>
        {
          option?.map((data, index)=>{
            return <option key={index} value={data} >{data}</option>
          })
        }
    </select>
    </div>
  )
}

const ModeDropdown = ({title, option, value, onChange})=>{
  return (
    <div>
        <select id="countries" defaultValue="mode" value={value} onChange={onChange} className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>{title}</option>
        {
          option?.map((data, index)=>{
            return <option key={index} value={data} >{data}</option>
          })
        }
    </select>
    </div>
  )
}

const MonthDropDown = ({month, setMonth})=>{
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return(
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Month</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={month}
          label="Month"
          onChange={handleChange}
          size='small'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Jan</MenuItem>
          <MenuItem value={1}>Feb</MenuItem>
          <MenuItem value={2}>March</MenuItem>
          <MenuItem value={3}>April</MenuItem>
          <MenuItem value={4}>May</MenuItem>
          <MenuItem value={5}>June</MenuItem>
          <MenuItem value={6}>July</MenuItem>
          <MenuItem value={7}>Aug</MenuItem>
          <MenuItem value={8}>Sep</MenuItem>
          <MenuItem value={9}>Oct</MenuItem>
          <MenuItem value={10}>Nov</MenuItem>
          <MenuItem value={11}>Dec</MenuItem>
        </Select>
      </FormControl>
  )
}

const YearDropDown = ({year, setYear})=>{
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return(
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Year</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={year}
          label="Year"
          onChange={handleChange}
          size='small'
        >
          {
            [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map((value, i)=>{
              return (
                <MenuItem key={i} value={value}>{value}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
  )
}

export {AttendanceDropdown, ModeDropdown, MonthDropDown, YearDropDown}

export default Dropdown