// src/components/DataGrid.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ data }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    // Add more columns as needed
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} />
    </div>
  );
};

export default DataTable;
