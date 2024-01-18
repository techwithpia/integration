import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import prulogo from "./pru-logo.png";

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#001f45' }}>
        <Toolbar style={{ backgroundColor: '#001f45', display: 'flex' , justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex', alignItems: 'center' , justifyContent: 'space-between'}}>
        
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>  
            
            <span style={{ marginLeft: '30px' }}>EAF Online</span>
            </Typography>
        </Box>
           
        <Button color="inherit" component={Link} to="/feed-analyzer">
          Feed Analyzer
        </Button>
        <Button color="inherit" component={Link} to="/user-profiles">
          User Profiles
        </Button>
        <Button color="inherit" component={Link} to="/system-status">
          System Status
        </Button>
        <Button color="inherit" component={Link} to="/eaf-codes">
          EAF Codes
        </Button>
        <Button color="inherit" component={Link} to="/file-staging">
          File Staging
        </Button>
        <Button color="inherit" component={Link} to="/bpc-logs">
          BPC Logs
        </Button>
        </Toolbar>
        </AppBar>
    );
}
export default Header;

//<img src={prulogo} alt="Pru Logo" style={{ width: '50px', height: 'auto' }}/>