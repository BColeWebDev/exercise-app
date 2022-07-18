import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import HomeIcon from "@mui/icons-material/HomeMaxRounded"
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = ({ children, routes }) => {
    return (
        <>
            {/* Dashboard */}
            <Box component={'section'} className="dashboard-wrapper">
                <Box className='dashboard'>
                    {/* Side Nav  */}
                    <Paper className="side-nav" component={'header'}>
                        <Box className="side-nav-content">
                            <Paper className="navbar" component={'nav'}>
                                <List sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                                    <ListItemButton component={'a'} href={"/dashboard"}  >
                                        <ListItemText primary="Home" color='primary' />
                                        <ListItemIcon>
                                            <HomeIcon className="icon" />
                                        </ListItemIcon>
                                    </ListItemButton>

                                    <ListItemButton component={'a'} href={routes.regiments} >
                                        <ListItemText primary="Regiments" />
                                        <ListItemIcon><ContentPasteIcon className="icon" />
                                        </ListItemIcon>
                                    </ListItemButton>

                                    <ListItemButton component={'a'} href={routes.exercises} >
                                        <ListItemText primary="Exercises" />
                                        <ListItemIcon>
                                            <FitnessCenterIcon className="icon" />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </List>
                            </Paper>
                        </Box>
                    </Paper>

                    {/* Dashboard Content */}
                    <Paper className="dashboard-content" elevation={1}>
                        {children}
                    </Paper>

                </Box>
                <ToastContainer />
            </Box>
        </>);
}

export default DashboardLayout;