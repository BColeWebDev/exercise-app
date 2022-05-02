import { Card, Typography, Button, CardContent, Container, CardActions, Box } from "@mui/material"
import Badge from '../commons/badge';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Regiment = ({ regiments, display, handleDelete, handleEdit }) => {


    return (<>
        {regiments ?

            <>
                {regiments.map(({ name, description, id, createdAt }) =>

                    <Card key={id} className={` dashboard-card ${display ? null : display}`} elevation={4} component={'li'}>
                        <CardContent className={'dashboard-card-body'}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                <EditIcon onClick={() => handleEdit(name, description, id)} cursor={'pointer'} sx={{ marginRight: "1.125rem" }} />
                                <DeleteIcon color="error" onClick={() => { handleDelete(id) }} cursor={'pointer'} />
                            </Box>

                            <Container>
                                {/* Title  */}
                                <Typography variant="h5" component={'h3'} color="text.secondary">
                                    Title
                                </Typography>

                                <Typography variant="subtitle2" component={'p'} color="text.primary"  >
                                    {name}
                                </Typography>
                            </Container>

                            <br></br>


                            <Container>
                                {/* Description */}
                                <Typography variant="h5" component={'h3'} color="text.secondary">
                                    Description
                                </Typography>
                                <Typography variant='p' component={'p'} color="text.primary"   >
                                    {description}
                                </Typography>
                            </Container>

                            <br></br>

                            <Container>
                                {/* Description */}
                                <Typography variant="subtitle1" component={'h3'} color="text.secondary">
                                    Created
                                </Typography>
                                <Typography variant='p' component={'p'} color="text.primary"   >
                                    {new Date(createdAt).toLocaleString('en-US')}

                                </Typography>

                            </Container>
                            <CardActions sx={{ margin: "1.125rem", justifyContent: 'center' }}>
                                <Button variant='contained' sx={{ fontWeight: "700" }}><Link href={`regiments/[id]`} as={`regiments/${id}`}>View Regiment</Link></Button>
                            </CardActions>
                        </CardContent>

                    </Card>
                )}
            </>
            :
            <Spinner />
        }

    </>);
}

export default Regiment;