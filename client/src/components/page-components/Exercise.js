import { useState } from 'react';
import Modal from "../commons/modal"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { FaRegWindowClose } from "react-icons/fa"
const Exercise = ({ exercise }) => {
    const { name, gifUrl, target, id, bodyPart, equipment } = exercise;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (<>
        <Card sx={{ maxWidth: 270, height: "100%", display: "flex", flexDirection: "column", marginBottom: "15px", marginLeft: "auto", marginRight: "auto" }} variant={"outlined"}>
            <CardMedia
                component="img"
                height="180"
                image={gifUrl}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                    {name}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: 'center' }}>
                <Button variant="outlined" color="primary" onClick={handleOpen}>View Details</Button>
            </CardActions>

            {/* Modal Contents */}
            <Modal handleOpen={handleOpen} handleClose={handleClose} open={open} sx={{ display: "flex" }}>
                <Container sx={{ display: "flex", alignItems: "center", marginBottom: "1.125rem", justifyContent: "space-between" }}>
                    <Typography variant="subtitle1" color={'primary'} fontWeight={'bold'}>ID: {id}</Typography>
                    <FaRegWindowClose fontSize={30} onClick={handleClose} />
                </Container>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="body1" textTransform={"capitalize"} margin={"0.75rem"}>{name}</Typography>
                    <Box>
                        <img src={`${gifUrl}`} alt={name} width={260} height={260}></img>
                    </Box>
                </Container>
                <Container>
                    <Box>
                        <Typography variant='body1'>Body Part 💪</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" textAlign={'center'} >{bodyPart}</Typography>
                    </Box>
                </Container>

                <Container>
                    <Box>
                        <Typography variant='body1'> Muscle Group 💪</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" textAlign={'center'} >{target}</Typography>
                    </Box>
                </Container>
                <Container>
                    <Box>
                        <Typography variant='body1'> Equipment 💪</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" textAlign={'center'} >{equipment}</Typography>
                    </Box>
                </Container>
            </Modal>
        </Card>



    </>);
}

export default Exercise;