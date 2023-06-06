import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here

//defining columns outside of the component is fine, is stable
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'parameters',
    header: 'PARAMETERS',
    size: 50,
  },
  {
    accessorKey: 'target',
    header: 'TARGET',
    size: 50,
  },
  {
    accessorKey: 'score',
    header: 'SCORE',
    size: 50,
  },
  {
    accessorKey: 'total_score',
    header: 'TOTAL SCORE',
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

const ScoreCard = () => {

  const handleExportData = () => {
    // csvExporter.generateCsv(data);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      // enableColumnActions={true}
      enableRowActions={({row, table})=>(
        <Box>
          <button>delete</button>
        </Box>
      )}
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
        </Box>
      )}
    />
  );
};

export default ScoreCard;
