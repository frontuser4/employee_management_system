import { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import { useLocation, useParams } from 'react-router-dom';
import { get, post, update } from '../utils/api';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';

function AttendanceColor({ cell }) {

  if (cell.getValue() === 'present') {
    return <div className='bg-green-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>;
  } else if (cell.getValue() === 'absent') {
    return <div className='bg-red-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>;
  } else if (cell.getValue() === 'MRM') {
    return <div className='bg-cyan-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>;
  }
  return cell.getValue();
}

const Table = ({}) => {

  const { state } = useLocation();
  const {id} = useParams();
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [approval, setApproval] = useState([]);
  const expensID = `${id}${dayjs(state.year).format('YYYY')}${dayjs(state.month).format('MM')}${dayjs(state.day).format('DD')}`;

  const getExprenceData = async () => {
    setLoading(true);
    setUserData([])
    const result = await get('/account/expence', id, state.month, state.year);
    setUserData(result);
    setLoading(false);
  }

  useEffect(() => {
    getExprenceData();
  }, [])

  useEffect(() => {
    getExprenceData();
  }, [state.year, state.month])

  const handleClick = (expenceId)=> {
      if(checked){
        setApproval([...approval, { expenceId: expenceId, approval: "approved"}])
      }
  }

  const handleApproval = async ()=>{
      //  const updateRes = await update('/account/expence', {data: approval})
      //  console.log("Approval updates: ", updateRes);
      console.log("desig: ", state.data.desig);
  }

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
        return <AttendanceColor cell={cell} />;
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
      accessorKey: 'payer__payerId',
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
    {
      accessorKey: 'approval',
      header: 'Approval',
      size: 50,
      Cell: ({ cell }) =>{
        return (
          <div className='flex gap-2'>
            <div className='bg-red-400 w-16 p-1 rounded text-center'>{cell.getValue()}</div>
            {
              state.data.desig === 'accounts' ? '' : ( <input 
                type='checkbox' 
                value={checked}
                className='w-4'
                onChange={(e)=> setChecked(e.target.checked)}   
                onClick={()=> handleClick(cell.row.original.expenceId)}
             />) 
            }
          </div>
        );
      }
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

  const handleExportData = () => {
    csvExporter.generateCsv(userData);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values })=> {
    userData[row.index] = values;
    //send/receive api updates here, then refetch or update local table data for re-render
    const updatedRes = await post('/account/expence', {emp: state.data.empId, expenceId: expensID, ...values});
    console.log("updateRes",updatedRes);
    // console.log("row: ", row.original.id);
    // console.log("values: ", values);
    setUserData([...userData]);
    exitEditingMode();
  }

  return (
    <MaterialReactTable
      initialState={{ columnVisibility: { emp_id: false } }}
      columns={columns}
      data={userData}
      enablePagination={false}
      enableColumnActions={true}
      onEditingRowSave={handleSaveRowEdits}
      enableRowSelection={false}
      enableRowActions = {state.data.desig === 'accounts' ? false : true}
      renderRowActions={({ row, table }) => (
        <Box>
          <IconButton onClick={()=> table.setEditingRow(row) }>
            <EditIcon />
          </IconButton>
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
        </Box>
      )}
      renderBottomToolbar={({ table }) => (
        <Box className='p-2 flex items-center justify-end'>
          <Button onClick={handleApproval} variant='contained'>Submit</Button>
        </Box>
      )}
    />
  );
};

export default Table;
