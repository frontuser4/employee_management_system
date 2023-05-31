import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridApiRef, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from '@mui/x-data-grid';


const columns = [
  { field: 'date', headerName: 'DATE', width: 100 },
  { field: 'tc', headerName: 'TC', width: 50 },
  { field: 'pc', headerName: 'PC', width: 50 },
  { field: 'sale', headerName: 'SALE', width: 100 },
  { field: 'workingHours', headerName: 'WORKING HOURS', width: 150 },
  { field: 'nameStockiest', headerName: 'NAME OF THE STOCKIEST', width: 150 },
  { field: 'townMarketWorked', headerName: 'TOWN AND MARKET WORKED', width: 150 },
  { field: 'travelFrom', headerName: 'TRAVEL FROM', width: 130 },
  { field: 'travelTo', headerName: 'TRAVEL TO', width: 130 },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
];

export default function Table() {
  // const apiRef = useGridApiRef();
  // const [coordinates, setCoordintaes] = useState({rowIndex:0, colIndex:0});

  // useEffect(()=>{
  //   const { rowIndex, colIndex } = coordinates;
  //   apiRef.current.scrollToIndexes(coordinates);
  //   const id = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex];
  //   const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
  //   apiRef.current.setCellFocus(id, column.field);

  // }, [apiRef, coordinates])
   
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}