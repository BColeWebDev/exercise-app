import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../src/redux/features/auth/authSlice";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import Logo from './logo';
import { useRouter } from 'next/router';

// routes when on different pages

const Navbar = ({ routes }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.auth)
    const [anchorEl, setAnchorEl] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        router.push("/")
    }


    return (<>
        <AppBar position="relative" component="nav" >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#292929' }}>
                <Logo route={user && token ? "/dashboard" : "/"} />
                {user === null && token === null ?
                    <>
                        <Box sx={{ display: { xs: 'none', md: "block" } }}>

                            <Button href={routes.login} variant='contained' sx={{ marginRight: '10px' }}>Login</Button>
                            <Button href={routes.register} variant='contained' color="secondary" >Register</Button>

                        </Box>
                        {/* Profile Icon */}
                        <IconButton sx={{ display: { xs: "block", md: "none" }, color: "white" }}
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
                            <MenuItem  ><Button href={routes.login} variant="outlined" onClick={handleClose} sx={{ width: '500px', marginBottom: '20px' }}>Login</Button></MenuItem>
                            <MenuItem onClick={handleClose} ><Button href={routes.register} variant="contained" color='secondary' sx={{ width: '500px', marginBottom: '20px' }}>Register</Button></MenuItem>
                        </Menu>
                    </>

                    :
                    <>
                        <Box>
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
                                <MenuItem onClick={handleClose} ><Button href="/dashboard" variant="outlined" sx={{ width: '500px', marginBottom: '20px' }}>Home</Button></MenuItem>
                                <MenuItem onClick={handleClose} ><Button href="/dashboard/regiments" variant="outlined" sx={{ width: '500px', marginBottom: '20px' }}>Regiments</Button></MenuItem>
                                <MenuItem onClick={handleClose} ><Button href="/dashboard/exercises" variant="outlined" sx={{ width: '500px', marginBottom: '20px' }}>Exercises</Button></MenuItem>
                                <MenuItem onClick={handleClose}><Button href='/' onClick={onLogout} variant="contained" sx={{ width: '500px', marginBottom: '20px' }} color='secondary' >Logout</Button></MenuItem>
                            </Menu>
                        </Box>
                    </>


                }
            </Toolbar>
        </AppBar>
    </>);
}

export default Navbar;