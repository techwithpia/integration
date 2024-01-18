import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGridPro } from '@mui/x-data-grid-pro';

function DetailPanelContent({ row: rowProp }) {
    const handleDownloadOutputFile = () => {
        const blob = new Blob(['Your output file content here'], { type: 'text/plain' });
        downloadFile(blob, rowProp.filename);
      };
    
      const handleDownloadLogFile = () => {
        const blob = new Blob(['Your log file content here'], { type: 'text/plain' });
        downloadFile(blob, rowProp.filename.replace('.01', '.log')); // Assuming a simple replacement for the log file name
      };
    
      const downloadFile = (blob, fileName) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
  return (
    <Stack
      sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="h6">{'Feed Details'}</Typography>
          <Typography variant="body2" color="textSecondary">
            Filename: {rowProp.filename}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Status: {rowProp.status}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Feed ID: {rowProp.feedid}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created Date: {rowProp.createddate} {/* Format the date as needed */}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleDownloadOutputFile}>
            Download Output File
          </Button>
          <Button variant="contained" color="primary" onClick={handleDownloadLogFile}>
            Download Log File
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

const columns = [
  { field: 'id', headerName: 'Order ID' },
  { field: 'filename', headerName: 'Filename', width: 650 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'feedid', headerName: 'Feed ID', width: 150 },
  { field: 'createddate', headerName: 'Created Date', width: 150 },
  {field: 'transaction', headerName: 'Transaction Amount', width: 150},
];

const rows = [
    {id:1, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705066, createddate: '2023-12-05', transaction: '00'},
    {id:2, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705067, createddate: '2023-12-05', transaction: '00'},
  // Add more rows as needed
];

export default function BasicDetailPanels() {
  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    [],
  );

  const getDetailPanelHeight = React.useCallback(() => 120, []);
  const filteredColumns = columns.filter((column) => column.field !== 'id');
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <DataGridPro
        columns={filteredColumns}
        rows={rows}
        rowThreshold={0}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
      />
    </Box>
  );
}
