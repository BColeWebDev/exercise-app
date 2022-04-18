import React from 'react';
import { Card, Typography, ButtonGroup, Button, CardContent, Box, Container, CardActions } from "@mui/material"
import Badge from '../commons/badge';
import Link from 'next/link';

const Regiment = ({ user, display }) => {
    // TODO: Display object with experience

    return (<>
        {user.regiments.map(({ name, description, id }) =>
            <Card key={id} className={` dashboard-card ${display}`} elevation={4}>
                <CardContent>
                    <Container>
                        <Badge label={user.experience} />
                    </Container>
                    <Container>
                        {/* Title  */}
                        <Typography variant="subtitle1" component={'h3'} color="text.secondary">
                            Title
                        </Typography>

                        <Typography variant='p' component={'p'} color="text.primary"  >
                            {name}
                        </Typography>
                    </Container>

                    <br></br>
                    <Container>
                        {/* Description */}
                        <Typography variant="subtitle1" component={'h3'} color="text.secondary">
                            Description
                        </Typography>
                        <Typography variant='p' component={'p'} color="text.primary"   >
                            {description}
                        </Typography>
                    </Container>

                </CardContent>
                <CardActions sx={{ margin: "1.125rem", justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ fontWeight: "700" }}><Link href={`regiments/[id]`} as={`regiments/${id}`}>View Regiment</Link></Button>
                </CardActions>
            </Card>
        )}
    </>);
}

export default Regiment;