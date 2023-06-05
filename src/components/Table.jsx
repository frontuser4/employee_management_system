import { useState, useEffect} from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { useLocation } from 'react-router-dom';
import {get} from '../utils/api';


//defining columns outside of the component is fine, is stable
// const columns = [
//   {
//     accessorKey: 'emp',
//     header: 'empId',
//     size: 40,
//   },
//   {
//     accessorKey: 'dateExp',
//     header: 'DATE',
//     size: 50,
//   },
//   {
//     accessorKey: 'attendance',
//     header: 'Attendance',
//     size: 50,
//   },
//   {
//     accessorKey: 'tc',
//     header: 'TC',
//     size: 50,
//   },
//   {
//     accessorKey: 'pc',
//     header: 'PC',
//     size: 50,
//   },
//   {
//     accessorKey: 'sale',
//     header: 'SALE',
//     size:50
//   },
//   {
//     accessorKey: 'workingHr',
//     header: 'WORKING HOURS',
//     size: 50,
//   },
//   {
//     accessorKey: 'payer',
//     header: 'Payer',
//     size: 50,
//   },
//   {
//     accessorKey: 'modeTravel',
//     header: 'Travel',
//     size: 50,
//   },
//   {
//     accessorKey: 'townMarketWork',
//     header: 'TOWN MARKET WORKED',
//     size: 50,
//   },

//   {
//     accessorKey: 'travelSource',
//     header: 'TRAVEL FROM',
//     size: 50,
//   },
//   {
//     accessorKey: 'travelDestination',
//     header: 'TRAVEL TO',
//     size: 50,
//   },
//   {
//     accessorKey: 'distance',
//     header: 'ONE SIDE KM',
//     size: 50,
//   },
//   {
//     accessorKey: 'dailyConveyance',
//     header: 'DAILY CONVEYANCE',
//     size: 50,
//   },
//   {
//     accessorKey: 'localConv',
//     header: 'LOCAL CONV',
//     size: 50,
//   },
//   {
//     accessorKey: 'travelingLong',
//     header: 'TRAVELING LONG',
//     size: 50,
//   },
//   {
//     accessorKey: 'lodginBoardig',
//     header: 'TRAVELING BOARDING',
//     size: 50,
//   },

//   {
//     accessorKey: 'food',
//     header: 'FOOD',
//     size: 50,
//   },
//   {
//     accessorKey: 'foodGST',
//     header: 'FOOD GST',
//     size: 50,
//   },

//   {
//     accessorKey: 'internet',
//     header: 'INTERNET',
//     size: 50,
//   },

//   {
//     accessorKey: 'postageCourier',
//     header: 'COURIER',
//     size: 50,
//   },

//   {
//     accessorKey: 'printingStationary',
//     header: 'STATIONARY',
//     size: 50,
//   },

//   {
//     accessorKey: 'other',
//     header: 'OTHER',
//     size: 50,
//   },
//   {
//     accessorKey: 'otherGst',
//     header: 'OTHERS GST',
//     size: 50,
//   },
//   {
//     accessorKey: 'nightAllowance',
//     header: 'NIGHT ALLOWANCE',
//     size: 50,
//   },

// ];

// const csvOptions = {
//   fieldSeparator: ',',
//   quoteStrings: '"',
//   decimalSeparator: '.',
//   showLabels: true,
//   useBom: true,
//   useKeysAsHeaders: false,
//   headers: columns.map((c) => c.header),
// };

// const csvExporter = new ExportToCsv(csvOptions);

const Table = () => {

  const { state } = useLocation();
  const [userData, setUserData] = useState([]);

   const getExprenceData = async()=>{
    const result = await get('/account/expence', state.data.empId);
    console.log("result: ", result)
    setUserData(result);
   }

  useEffect(() => {
    getExprenceData();
  }, [])

  const columns = [
    {
      accessorKey: 'emp',
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
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
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
      size:50
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

  const getCommonEditTextFieldProps = (cell)=>{
      console.log("cell: ", cell);
  }

  return (
    <MaterialReactTable
      muiTableProps={{sx:{
        overflowX:'scroll'
      }}}
      columns={columns}
      data={userData}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
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
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Selected Rows
          </Button>
        </Box>
      )}
    />
  );
};

export default Table;
