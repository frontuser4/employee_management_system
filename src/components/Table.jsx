import { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import { useLocation } from 'react-router-dom';
import { get } from '../utils/api';
import dayjs from 'dayjs';
import {  MonthDropDown, YearDropDown } from '../components/Dropdown';

function AttendanceColor({cell}){
  if(cell.getValue() === 'present'){
    return <div className='bg-green-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>;
  }else if(cell.getValue() === 'absent'){
    return <div className='bg-red-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>;
  }else if(cell.getValue() === 'MRM'){
    return <div className='bg-cyan-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>;
  }
   return cell.getValue();
}

const Table = () => {

  const { state } = useLocation();
  const [userData, setUserData] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [year, setYear] = useState(dayjs(date.$d).format('YYYY'));
  const [month, setMonth] = useState(dayjs(date.$d).format('MM').split('')[1]);
  const [isLoading, setLoading] = useState(false);

  const getExprenceData = async () => {
    setLoading(true);
    const result = await get('/account/expence', state.data.empId, month, year);
    setUserData(result);
    setLoading(false);
  }

  useEffect(() => {
    getExprenceData();
  }, [])

  useEffect(() => {
    getExprenceData();
  }, [year, month])

  const columns = [
    {
      accessorKey: 'emp_id',
      header: 'empId',
      size: 40,
    },
    {
      accessorKey: 'dateExp',
      header: 'DATE',
      size: 50,
    },
    {
      accessorKey: 'attendance',
      header: 'Attendance',
      size: 50,
      Cell: ({ cell }) => {
        return <AttendanceColor cell={cell}/>;
      },
    },
    {
      accessorKey: 'tc',
      header: 'TC',
      size: 50,
    },
    {
      accessorKey: 'pc',
      header: 'PC',
      size: 50,
    },
    {
      accessorKey: 'sale',
      header: 'SALE',
      size: 50
    },
    {
      accessorKey: 'workingHr',
      header: 'WORKING HOURS',
      size: 50,
    },
    {
      accessorKey: 'payer',
      header: 'Payer',
      size: 50,
    },
    {
      accessorKey: 'modeTravel',
      header: 'Travel',
      size: 50,
    },
    {
      accessorKey: 'townMarketWork',
      header: 'TOWN MARKET WORKED',
      size: 50,
    },

    {
      accessorKey: 'travelSource',
      header: 'TRAVEL FROM',
      size: 50,
    },
    {
      accessorKey: 'travelDestination',
      header: 'TRAVEL TO',
      size: 50,
    },
    {
      accessorKey: 'distance',
      header: 'ONE SIDE KM',
      size: 50,
    },
    {
      accessorKey: 'dailyConveyance',
      header: 'DAILY CONVEYANCE',
      size: 50,
    },
    {
      accessorKey: 'localConv',
      header: 'LOCAL CONV',
      size: 50,
    },
    {
      accessorKey: 'travelingLong',
      header: 'TRAVELING LONG',
      size: 50,
    },
    {
      accessorKey: 'lodginBoardig',
      header: 'TRAVELING BOARDING',
      size: 50,
    },

    {
      accessorKey: 'food',
      header: 'FOOD',
      size: 50,
    },
    {
      accessorKey: 'foodGST',
      header: 'FOOD GST',
      size: 50,
    },

    {
      accessorKey: 'internet',
      header: 'INTERNET',
      size: 50,
    },

    {
      accessorKey: 'postageCourier',
      header: 'COURIER',
      size: 50,
    },

    {
      accessorKey: 'printingStationary',
      header: 'STATIONARY',
      size: 50,
    },

    {
      accessorKey: 'other',
      header: 'OTHER',
      size: 50,
    },
    {
      accessorKey: 'otherGst',
      header: 'OTHERS GST',
      size: 50,
    },
    {
      accessorKey: 'nightAllowance',
      header: 'NIGHT ALLOWANCE',
      size: 50,
    },

  ];

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(userData);
  };

  const getCommonEditTextFieldProps = (cell) => {
    setCell(cell);
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={userData}
      enablePagination={false}
      enableColumnActions={true}
      muiSelectCheckboxProps={false}
      renderRowActions={({row, table})=>(
        <Box>
          <button>edit</button>
          <button>edit</button>
        </Box>
      )}
      state={{ isLoading: isLoading }}
      renderTopToolbarCustomActions={({ table }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ p: '0.5rem' }}
          >
            <Button
              color="primary"
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export All Data
            </Button>
          </Box>
          <div>
            <MonthDropDown month={month} setMonth={setMonth} />
          </div>
          <div>
            <YearDropDown year={year} setYear={setYear} />
          </div>
        </Box>
      )}
    />
  );
};

export default Table;
