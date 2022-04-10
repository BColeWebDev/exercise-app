import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import Logo from './logo';
const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const [anchorEl, setAnchorEl] = useState(null);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <Box sx={{ flexGrow: 1, }} component="nav">
            <AppBar position="static"  >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#121212' }}>
                    <Logo route={'/'} />
                    {user === null ?
                        <>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Button href='/login' variant='contained' sx={{ marginRight: '10px' }}>Login</Button>
                                <Button href='/register' variant='contained' color="secondary" >Register</Button>
                            </Box>
                            <IconButton sx={{ display: { md: 'none' }, color: "white" }}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}>
                                <MenuIcon fontSize="large" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}

                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem  ><Button href="/login" variant="outlined" onClick={handleClose} sx={{ width: '500px', marginBottom: '20px' }}>Login</Button></MenuItem>
                                <MenuItem onClick={handleClose} ><Button href='/register' variant="contained" color='secondary' sx={{ width: '500px', marginBottom: '20px' }}>Register</Button></MenuItem>
                            </Menu>
                        </>

                        :
                        <>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle sx={{ color: "white" }}
                                    fontSize="large"
                                />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} ><Button href="/" variant="outlined" sx={{ width: '500px', marginBottom: '20px' }}>Profile</Button></MenuItem>
                                <MenuItem onClick={handleClose}><Button href='/' variant="contained" sx={{ width: '500px', marginBottom: '20px' }} color='secondary' >Logout</Button></MenuItem>
                            </Menu>

                        </>


                    }
                </Toolbar>
            </AppBar>
        </Box>
    </>);
}

export default Navbar;