import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid } from '@mui/x-data-grid';

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BasicTabs() {
  const [tabValue, setTabValue] = useState(0);
  const [tabs, setTabs] = useState(() => {
    const localTabs = localStorage.getItem('tabs');
    return localTabs ? JSON.parse(localTabs) : [{ label: 'Default', data: [] }];
  });

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddTab = () => {
    setTabs([...tabs, { label: `Tab ${tabs.length}`, data: [] }]);
  };

  const handleRemoveTab = (index) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    if (tabValue >= index && tabValue > 0) {
      setTabValue(tabValue - 1);
    }
  };

  const handleSearch = (index) => {
    // Implement your API search logic here
    // Update the data for the specific tab
    const newData = []; // Replace with API call results
    const updatedTabs = tabs.map((tab, i) =>
      i === index ? { ...tab, data: newData } : tab
    );
    setTabs(updatedTabs);
  };
  const columns = [
    { field: 'id', headerName: 'Order ID' },
    { field: 'filename', headerName: 'Filename', width: 650 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'feedid', headerName: 'Feed ID', width: 150 },
    { field: 'createddate', headerName: 'Created Date', width: 150 },
    { field: 'transaction', headerName: 'Transaction Amount', width: 150 },
  ];
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
        <Button onClick={handleAddTab}>Add Tab</Button>
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={tabValue} index={index}>
          {index === 0 ? (
            <DataGrid rows={tab.data || []} columns={columns} />
          ) : (
            <>
              <TextField label="Search" variant="outlined" />
              <Button onClick={() => handleSearch(index)}>Search</Button>
              <DataGrid rows={tab.data || []} columns={columns} />
              <Button onClick={() => handleRemoveTab(index)}>Remove Tab</Button>
            </>
          )}
        </TabPanel>
      ))}
    </Box>
  );
}
