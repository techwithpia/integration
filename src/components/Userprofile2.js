import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DataGridComponent = ({ name }) => {
  const localStorageKey = `datagrid_${name}`;
  
  const [rows, setRows] = useState(() => {
    const storedRows = localStorage.getItem(localStorageKey);
    return storedRows ? JSON.parse(storedRows) : [
      { id: 1, name: 'John Smith' },
      { id: 2, name: 'Jane Doe' },
    ];
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
  ];

  const handleRowEdit = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(rows));
  }, [rows, localStorageKey]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Data Grid for {name}</Typography>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onEditCellChangeCommitted={(params) =>
          handleRowEdit(params.id, params.field, params.props.value)
        }
      />
    </Grid>
  );
};

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddName = () => {
    setNames((prevNames) => [...prevNames, name]);
    setName('');
  };

  const handleNameSelect = (event) => {
    setSelectedName(event.target.value);
  };

  const handleSaveToLocal = () => {
    // You can add more logic here to customize how data is saved to local storage.
    alert('Save successful!');
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Name List and Data Grid
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        style={{ marginRight: 10 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddName}>
        Add Name
      </Button>
      <div style={{ marginTop: 20 }}>
        <Select value={selectedName} onChange={handleNameSelect} variant="outlined">
          <MenuItem value="" disabled>
            Select a Name
          </MenuItem>
          {names.map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </Select>
      </div>
      {selectedName && (
        <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
          <DataGridComponent key={selectedName} name={selectedName} />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={handleSaveToLocal}
          >
            Save to Local Storage
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default App;
