import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid } from '@mui/x-data-grid';

function DetailPanelContent({ rowData }) {
  const handleDownloadOutputFile = () => {
    // Implement your logic for downloading output file
  };

  const handleDownloadLogFile = () => {
    // Implement your logic for downloading log file
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
            Filename: {rowData.filename}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Status: {rowData.status}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Feed ID: {rowData.feedid}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created Date: {rowData.createddate} {/* Format the date as needed */}
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

export default function BasicDetailPanels() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'Order ID' },
    { field: 'filename', headerName: 'Filename', width: 650 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'feedid', headerName: 'Feed ID', width: 150 },
    { field: 'createddate', headerName: 'Created Date', width: 150 },
    { field: 'transaction', headerName: 'Transaction Amount', width: 150 },
  ];

  const rows = [
    { id: 1, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705066, createddate: '2023-12-05', transaction: '00' },
    { id: 2, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705067, createddate: '2023-12-05', transaction: '00' },
    // Add more rows as needed
  ];
  const filteredColumns = columns.filter((column) => column.field !== 'id');
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <DataGrid
        columns={filteredColumns}
        rows={rows}
        rowThreshold={0}
        onRowClick={handleRowClick}
      />
      {selectedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Details</DialogTitle>
          <DialogContent>
            <DetailPanelContent rowData={selectedRow} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
