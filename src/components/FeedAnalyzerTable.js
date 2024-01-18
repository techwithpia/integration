import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: theme.palette.common.black,
    backgroundColor: '#0047AB',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(FileName, Status, FeedID, CreatedDate, InterfaceTransactionAmount) {
    return { FileName, Status, FeedID, CreatedDate, InterfaceTransactionAmount };
}

const rows = [
  createData('ORCL.ORACLEBI.TAHOE_JOURNAL.20231129.37', 'PP', 3700487, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('ORCL.ORACLEBI.TAHOE.20231129.37', 'PC', 3700486, 'Wed Nov 29 18:03:26 GMT 2023', '00'),
  createData('ORCL.ORACLEBI.ATOM_MONTHLYBIOUT.EUR.20231129.37', 'TF', 3700485, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('ORCL.ORACLEBI.BARRS_TDD_BI1OUT.GBP.20231129.37', 'E', 3700484, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('ORCL.ORACLEBI.CPTINSURSTATQ_OUT.20231129.37', 'E', 3700483, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('ORCL.ORACLEGL.JPNDISCLOSEDREPORTING.20231129.37', 'PC', 3700482, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('PRU.EFDW.TAHOE_JOURNAL.20231129.37', 'TF', 3700481, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('WHS.ORACLEWH.TAHOE_FOR_FUN.20231129.37', 'PC', 3700480, 'Wed Nov 29 18:04:26 GMT 2023', '00'),
  createData('PIPS.ACCOUNTING.P1.20231129.37', 'PC', 3700479, 'Wed Nov 29 18:04:26 GMT 2023', '00')
];


export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>File Name</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Feed id&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Created Date&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Interface Transaction Amount&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.FileNamename}>
              <StyledTableCell component="th" scope="row">
                {row.FileName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Status}</StyledTableCell>
              <StyledTableCell align="right">{row.FeedID}</StyledTableCell>
              <StyledTableCell align="right">{row.CreatedDate}</StyledTableCell>
              <StyledTableCell align="right">{row.InterfaceTransactionAmount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}