import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function DynamicDropdown() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);

  const dynamicOptions = [
    {
      value: 'option1',
      label: 'UserProfile1',
      data: [
        { id: 1, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705066, createddate: '2023-12-05', transaction: '00' },
        { id: 2, filename: 'ORCL.ORACLEBI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705067, createddate: '2023-12-05', transaction: '00' },
        // Add more data as needed
      ],
    },
    {
      value: 'option2',
      label: 'UserProfile2',
      data: [
        { id: 1, filename: 'ORCL.ORACLEGL.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705066, createddate: '2023-12-05', transaction: '00' },
        { id: 2, filename: 'ORCL.ORACLEGL.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705067, createddate: '2023-12-05', transaction: '00' },
        // Add more data as needed
      ],
    },
    {
      value: 'option3',
      label: 'UserProfile3',
      data: [
        { id: 1, filename: 'ORCL.ORACLEHI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705066, createddate: '2023-12-05', transaction: '00' },
        { id: 2, filename: 'ORCL.ORACLEHI.TAHOE_JOURNAL.20231204.01', status: 'PC', feedid: 3705067, createddate: '2023-12-05', transaction: '00' },
        // Add more data as needed
      ],
    },
  ];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Find the selected option's content
    const selectedOption = dynamicOptions.find((option) => option.value === selectedValue);
    setSelectedContent(selectedOption);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="dynamicDropdownLabel">Select Dynamic Content</InputLabel>
        <Select
          labelId="dynamicDropdownLabel"
          id="dynamicDropdown"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {dynamicOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Conditionally render DataGrid based on the selected option */}
      {selectedContent && selectedContent.data && (
        <div style={{ height: 400, width: '100%' }}>
          <Typography variant="h6">Selected Content</Typography>
          <Typography variant="subtitle1">{selectedContent.label}</Typography>
          <DataGrid
            rows={selectedContent.data}
            columns={[
                { field: 'id', headerName: 'Order ID' },
                { field: 'filename', headerName: 'Filename', width: 650 },
                { field: 'status', headerName: 'Status', width: 150 },
                { field: 'feedid', headerName: 'Feed ID', width: 150 },
                { field: 'createddate', headerName: 'Created Date', width: 150 },
                { field: 'transaction', headerName: 'Transaction Amount', width: 150 },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default DynamicDropdown;
