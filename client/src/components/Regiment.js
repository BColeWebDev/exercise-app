import React from 'react';
import { Card, Typography, ButtonGroup, Button, Container, Chip, Box } from "@mui/material"
import Badge from './badge';

const Regiment = ({ user, display }) => {
    // TODO: Display object with experience

    return (<>
        {user.regiments.map(({ name, id, experience }) =>
            <Card key={id} component={'li'} className={`dashboard-card ${display}`}>
                <Container sx={{ padding: "0.5rem", display: "flex", justifyContent: "space-around", flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
                    <Box sx={{ margin: "0.5rem" }}>
                        <Typography variant='h6' component={'h5'} color="primary" fontWeight={"bold"} >{name}</Typography>
                    </Box>
                    <Box sx={{ margin: "0.5rem" }}>
                        <Badge label={user.experience} />
                    </Box>
                </Container>
                <ButtonGroup sx={{ margin: "1.125rem", }}>
                    <Button variant='contained' sx={{ fontWeight: "700" }}>View</Button>
                </ButtonGroup>
            </Card>
        )}
    </>);
}

export default Regiment;