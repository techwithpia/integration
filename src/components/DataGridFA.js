  import * as React from 'react';
  import Box from '@mui/material/Box';
  import { DataGrid } from '@mui/x-data-grid';
  import { Link as RouterLink } from 'react-router-dom';

  const columns = [
      { field: 'id', headerName: 'ID', width: 90 , hide: true},
    {
      field: 'fileName',
      headerName: 'File name',
      width: 500,
      editable: true,
      renderCell: (params) => (
        <RouterLink to={`/details/${params.row.id}`}>
          {params.value}
        </RouterLink>
      ),
      
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
    },
    {
      field: 'feedID',
      headerName: 'Feed ID',
      width: 110,
      editable: true,
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      width: 110,
      editable: true,
    },
  ];

  const rows = [
  {id:1, fileName: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedID: 3705066, createdDate: '2023-12-05'},
  {id:2, fileName: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedID: 3705067, createdDate: '2023-12-05'},
  ];

  export default function DataGridDemo() {
    const filteredColumns = columns.filter((column) => column.field !== 'id');
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          //column indexing?
          columns={filteredColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
    );
  }