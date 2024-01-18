import React from "react";
import UP from './Userprofile2';
import DD from './dragdrop';
import TH from './TabsHandle';
import TH2 from './TabsHandle2';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const BPC = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return(
      <> 
    <TH2 />
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>User Profile 1</MenuItem>
          <MenuItem value={20}>User Profile 2</MenuItem>
          <MenuItem value={30}>User Profile 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </>
      
      
    )
}
export default BPC;