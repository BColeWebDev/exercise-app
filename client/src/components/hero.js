import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
const Hero = () => {
    const { user } = useSelector((state) => state.auth)
    console.log(user)
    return (<>
        <div className='hero-img' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: "#050505" }} component="section">
            <Box style={{ marginBottom: '1.125rem', textAlign: 'center' }}>
                <Typography variant="h2" component="h1" color='inherit' >Set Your Goals!</Typography>
            </Box>
            <Box style={{ marginBottom: '1.125rem', textAlign: 'center' }}>
                <Typography variant="h4" component="h2">Crush Your Goals!</Typography>
            </Box>
            <Button variant="contained" sx={{ fontWeight: 'bolder' }} color="primary" href={user === null ? "/auth/login" : "/auth/dashboard"}>Get Started</Button>
        </div >
    </>);
}

export default Hero;