import React, { useState, useEffect } from 'react';
import { Tabs, Tab, IconButton, Button, Box, TextField , Dialog, DialogTitle, DialogContent, Paper} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import SearchIcon from '@mui/icons-material/Search';

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
              Filename: {rowData.fileName}
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
  

const initialRows = [
    
    
    // ... other rows
];

const initialColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'fileName', headerName: 'File Name', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'createdDate', headerName: 'createdDate', width: 130 },
];

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key, defaultValue) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
}

const App = () => {
    const defaultTabs = [{ id: 0, label: 'Tab 1', filterModel: { items: [] } }];
    const loadedTabs = loadFromLocalStorage('tabs', defaultTabs);
    const [tabs, setTabs] = useState(loadedTabs);
    const [activeTab, setActiveTab] = useState(loadFromLocalStorage('activeTab', 0));
    const [editingLabel, setEditingLabel] = useState(null);
    const [tempLabel, setTempLabel] = useState("");


    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        saveToLocalStorage('tabs', tabs);
        saveToLocalStorage('activeTab', activeTab);
    }, [tabs, activeTab]);

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const addTab = () => {
        const newTabId = tabs.length;
        const newTab = {
            id: newTabId,
            label: `Tab ${newTabId + 1}`,
            filterModel: { items: [] },
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newTabId);
    };

    const removeTab = (tabId) => {
        const updatedTabs = tabs.filter(tab => tab.id !== tabId);
        setTabs(updatedTabs);
        setActiveTab(prevIndex => prevIndex >= tabId ? Math.max(0, prevIndex - 1) : prevIndex);
    };

    const startEditingLabel = (tabId, currentLabel) => {
        setEditingLabel(tabId);
        setTempLabel(currentLabel);
    };

    const handleLabelChange = (event) => {
        setTempLabel(event.target.value);
    };

    const stopEditingLabel = (tabId) => {
        const updatedTabs = tabs.map(tab => tab.id === tabId ? { ...tab, label: tempLabel } : tab);
        setTabs(updatedTabs);
        setEditingLabel(null);
    };

    const handleFilterChange = (tabId, newFilterModel) => {
        const updatedTabs = tabs.map(tab => tab.id === tabId ? { ...tab, filterModel: newFilterModel } : tab);
        setTabs(updatedTabs);
    };

    const saveFilterChanges = () => {
        saveToLocalStorage('tabs', tabs);
        alert('Filter changes saved!');
    };

    return (
        <>
            <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
                {tabs.map(tab => (
                    <Tab
                        key={tab.id}
                        label={
                            editingLabel === tab.id ? (
                                <TextField
                                    size="small"
                                    value={tempLabel}
                                    onChange={handleLabelChange}
                                    onBlur={() => stopEditingLabel(tab.id)}
                                    autoFocus
                                />
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => startEditingLabel(tab.id, tab.label)}>
                                    {tab.label}
                                    <IconButton onClick={() => removeTab(tab.id)} size="small">
                                        <CloseIcon fontSize='small'/>
                                    </IconButton>
                                </Box>
                            )
                        }
                    />
                ))}
                <IconButton onClick={addTab} size="small">
                    <AddBoxIcon />
                </IconButton>
            </Tabs>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                />
                <Button variant="contained"  startIcon={<SearchIcon />}>
                    Search
                </Button>
            </Box>
            {tabs.map((tab, index) => (
                <div key={tab.id} style={{ display: index === activeTab ? 'block' : 'none', height: 400, width: '100%' }}>
                    <Box sx={{ width: '100%', height: 400 }}>
                    <DataGrid
                        rows={initialRows}
                        columns={initialColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        filterModel={tab.filterModel}
                        onFilterModelChange={(newFilterModel) => handleFilterChange(tab.id, newFilterModel)}
                        onRowClick={handleRowClick}
                    />
                    {selectedRow && (
        <Dialog open={open} onClose={closeDialog} sx={{ width: '100%', maxWidth: '1000px', mx: 'auto' }}>
          <DialogTitle>Feed Details</DialogTitle>
          <DialogContent>
            <DetailPanelContent rowData={selectedRow} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
          </Box>        
                </div>
            ))}
            <Button onClick={saveFilterChanges}>Save Filter Changes</Button>

           
        </>
    );
};

export default App;
