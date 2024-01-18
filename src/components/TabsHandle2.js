import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip'
const ProfileDialogPage = () => {
  const [open, setOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [useDefault, setUseDefault] = useState(false);

  const [rows, setRows] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState('');

   // New state for multiple selections
   const [selectedValues, setSelectedValues] = useState([]);

 // operations dropdown options
   const operations = ['like', 'not like', 'null', 'not null'];

    // Dummy column names for selection (can be dynamic)
  const columnNames = ['File Name', 'Feed Status', 'Created Date', 'Feed ID', 'Transaction Amount'];

  const handleChangeMultiple = (event) => {
    const { value } = event.target;
    setSelectedValues(typeof value === 'string' ? value.split(',') : value);
  };

  const handleAddRow = () => {
    setRows([...rows, { columnName: selectedColumnName, operation: '', value1: '', value2: '' }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleProfileNameChange = (event) => setProfileName(event.target.value);
  const handleCheckboxChange = (event) => setUseDefault(event.target.checked);
  const handleSave = () => {
    // Save or Run your action here
    // For now, just closing the dialog
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open Profile Dialog
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle variant='outlined'>User Profile Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="profile-name"
            label="Profile Name"
            type="text"
            fullWidth
            variant="standard"
            value={profileName}
            onChange={handleProfileNameChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={useDefault}
                onChange={handleCheckboxChange}
              />
            }
            label="Use as default"
          />
  <br/>
  <br/>
<TableContainer component={Paper}>
    <Table>
      <TableHead>
        Filter Criteria
        <TableRow>
          <TableCell>Column Name</TableCell>
          <TableCell>Operation</TableCell>
          <TableCell>Value 1</TableCell>
          <TableCell align="right">
            <IconButton onClick={handleAddRow}>
              <AddCircleOutlineIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>
              <Select
                value={row.columnName}
                onChange={(e) => handleRowChange(index, 'columnName', e.target.value)}
                fullWidth
              >
                {columnNames.map((name, idx) => (
                  <MenuItem key={idx} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select
                value={row.operation}
                onChange={(e) => handleRowChange(index, 'operation', e.target.value)}
                fullWidth
              >
                {operations.map((operation, idx) => (
                  <MenuItem key={idx} value={operation}>{operation}</MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <TextField
                value={row.value1}
                onChange={(e) => handleRowChange(index, 'value1', e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => handleDeleteRow(index)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <br/>
  <br/>
  <TableContainer component={Paper}>
            <Table>
              <TableHead>
                  Displayed Columns
                <TableRow>
                  <TableCell>Select Columns</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Select
                      multiple
                      value={selectedValues}
                      onChange={handleChangeMultiple}
                      input={<OutlinedInput id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                      fullWidth
                    >
                      {columnNames.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' size='large'>Close</Button>
          <Button onClick={handleSave} color="primary" variant='outlined' size='large'>Save/Run</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileDialogPage;
