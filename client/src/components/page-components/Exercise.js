import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createPlan } from "../../redux/features/plans/plansSlice"
import Modal from "../commons/modal"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useRouter } from "next/router"
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { FaRegWindowClose } from "react-icons/fa"
import { success } from '../commons/notifications';
const Exercise = ({ exercise, display }) => {

    // Training Day ID when adding a new exercise 
    const router = useRouter()
    const {
        query: { TrainingDayId, CurrentId },
    } = router
    const { name, gifUrl, muscle_target, id, bodyPart, equipment, target } = exercise;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()

    const hanldeSubmit = () => {
        let obj = { name: name, imageUrl: gifUrl, muscle_target: target, bodyPart: bodyPart, equipment: equipment, TrainingDayId: TrainingDayId }
        dispatch(createPlan(obj))
        success("workout added")
        router.push(`/dashboard/regiments/${CurrentId}`)
    }


    return (<>
        {/* Exercise Card */}
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
                <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ marginRight: '10px' }}>
                        <Typography variant='h6' color={'primary'} >Body Part:</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" textAlign={'center'} color={"secondary"} >{bodyPart}</Typography>
                    </Box>
                </Container>

                <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ marginRight: '10px' }}>
                        <Typography variant='h6' color={'primary'}> Muscle Group: </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" textAlign={'center'} color={"secondary"} >{muscle_target === undefined ? target : muscle_target}</Typography>
                    </Box>
                </Container>
                <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ marginRight: '10px' }}>
                        <Typography variant='h6' color={'primary'}> Equipment:</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" textAlign={'center'} color={"secondary"} >{equipment}</Typography>
                    </Box>
                </Container>
                <Container sx={{ display: "flex", flexDirection: "column" }}>
                    {/* Adds exercise if exists */}
                    {TrainingDayId === undefined ? null : <Button variant='contained' sx={{ display: display }} onClick={() => hanldeSubmit(exercise)}>Add to Regiment</Button>}
                </Container>
            </Modal>
        </Card>



    </>);
}

export default Exercise;