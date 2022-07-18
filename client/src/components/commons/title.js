import React from 'react'
import { Container, Typography, Paper } from "@mui/material";

// Page Title
const Title = ({ title }) => {
    return (

        <Container sx={{ marginBottom: "1.125rem", marginLeft: "auto", marginRight: "auto" }}>
            <Typography textAlign={'Center'} padding={'1.5rem'} variant="h4" component={'h1'}>{title}</Typography>
            <hr></hr>
        </Container>
    )
}

export default Title