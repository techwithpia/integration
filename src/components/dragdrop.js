import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'age', headerName: 'Age', width: 90 },
  // Add more columns as needed
];

const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
  { id: 2, firstName: 'Jane', lastName: 'Doe', age: 30 },
  // Add more rows as needed
];

const MyDataGrid = () => {
  const [currentColumns, setCurrentColumns] = useState(columns);

  const handleColumnPositionChange = (params) => {
    // Update the state with the new column order
    setCurrentColumns(params.columns);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={currentColumns}
        onColumnPositionChange={handleColumnPositionChange}
      />
    </div>
  );
};

export default MyDataGrid;
