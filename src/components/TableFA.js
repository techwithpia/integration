import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

function DetailPanelContent({ row }) {
  const handleDownloadOutputFile = () => {
    // Your download logic for output file
  };

  const handleDownloadLogFile = () => {
    // Your download logic for log file
  };

  return (
    <Stack sx={{ py: 2, height: '100%', boxSizing: 'border-box' }} direction="column">
      <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="h6">{'Feed Details'}</Typography>
          <Typography variant="body2" color="textSecondary">
            Filename: {row.filename}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Status: {row.status}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Feed ID: {row.feedid}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created Date: {row.createddate} {/* Format the date as needed */}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleDownloadOutputFile}>
            Download Output File
          </Button>
          <Button variant="contained" color="primary" onClick={handleDownloadLogFile}>
            Download Log File
          </Button>
          <Button variant="contained" color="primary" onClick={handleDownloadLogFile}>
            Get Cyberfusion Log
          </Button>

         </Stack>
      </Paper>
    </Stack>
  );
}

const rows = [
    { id: 1, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705066, createddate: '2023-12-05', transaction: '00' },
    { id: 2, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705067, createddate: '2023-12-05', transaction: '00' },
    // Add more rows as needed
  ];
  
export default function BasicDetailPanels() {
  const [expandedRow, setExpandedRow] = React.useState(null);

  const handleRowClick = (row) => {
    if (expandedRow === row.id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(row.id);
    }
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell>Filename</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Feed ID</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Transaction Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow onClick={() => handleRowClick(row)}>
                  <TableCell>{row.filename}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.feedid}</TableCell>
                  <TableCell>{row.createddate}</TableCell>
                  <TableCell>{row.transaction}</TableCell>
                </TableRow>
                {expandedRow === row.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <DetailPanelContent row={row} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
