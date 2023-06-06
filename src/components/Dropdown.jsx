import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StockistDropdown = ({title, option, value, onChange})=>{
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return(
    <FormControl sx={{ width: '100%'}}>
        <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label={title}
          onChange={handleChange}
          size='small'
        >
         {
          option?.map((data, index)=>{
           return <MenuItem key={index} value={data.payerId}>[{data.payerId}] {data.stokist_name}</MenuItem>
          })
        }
        </Select>
      </FormControl>
  )
}

const AttendanceDropdown = ({title, option, value, onChange})=>{
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return(
    <FormControl sx={{ width: '100%'}}>
        <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label={title}
          onChange={handleChange}
          size='small'
        >
         {
          option?.map((data, index)=>{
           return <MenuItem key={index} value={data}>{data}</MenuItem>
          })
        }
          
        </Select>
      </FormControl>
  )
}

const ModeDropdown = ({title, option, value, onChange})=>{
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return(
    <FormControl sx={{ width: '100%'}}>
        <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          label={title}
          onChange={handleChange}
          size='small'
        >
           {
          option?.map((data, index)=>{
           return <MenuItem key={index} value={data}>{data}</MenuItem>
          })
        }
        </Select>
      </FormControl>
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
          <MenuItem value={1}>Jan</MenuItem>
          <MenuItem value={2}>Feb</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>Aug</MenuItem>
          <MenuItem value={9}>Sep</MenuItem>
          <MenuItem value={10}>Oct</MenuItem>
          <MenuItem value={11}>Nov</MenuItem>
          <MenuItem value={12}>Dec</MenuItem>
        </Select>
      </FormControl>
  )
}

const YearDropDown = ({year, setYear})=>{

  // console.log(year.map((year)=> year+1));

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

export {AttendanceDropdown, ModeDropdown, StockistDropdown, MonthDropDown, YearDropDown}
