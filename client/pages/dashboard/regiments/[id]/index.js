import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getRegimentById, } from "../../../../src/redux/features/regiments/regimentsSlice"
import { error, success } from '../../../../src/components/commons/notifications';
import { getAllDays, createDay, deleteDay, updateDay } from '../../../../src/redux/features/training days/daySlice';
import Title from '../../../../src/components/commons/title';
import { Container, Paper, Typography, Box, ButtonGroup, Button, FormControl, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, } from "@mui/material";
import Workouts from '../../../../src/components/page-components/Workouts';
import Modal from "../../../../src/components/commons/modal"
import DashboardLayout from '../../../../src/components/page-components/dashboard-layout';
import Navbar from '../../../../src/components/commons/navbar';
import Badge from '../../../../src/components/commons/badge';
import { FaCalendar, FaRegWindowClose } from "react-icons/fa"
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from '../../../../src/components/commons/spinner';

const Regiment = ({ id }) => {
    // Global State
    const router = useRouter()
    const dispatch = useDispatch()
    const { plans } = useSelector((state) => state.plans)
    const { currentRegiment } = useSelector((state) => state.regiments)
    const { days, isError, isSuccess, message } = useSelector((state) => state.days)
    const { user, token } = useSelector((state) => state.auth)


    // Component State
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalInitialState = { description: "", btnName: "Submit", title: "Create Day", currentId: null }
    const [form, setForm] = useState(modalInitialState);
    const [day, setDay] = useState("");

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    // Component Handlers
    const handleModalChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    useEffect(() => {
        // user is not logged in anymore return to login page
        if (user === null || token === null) {
            router.push("/")
        }
        // Error Handling 
        if (isError) {
            error(message)
        }

        // Successful Message
        if (isSuccess) {
            message === "" ? null : success(message)
        }
        //Gets all Days by Regiment ID
        let { id } = router.query
        dispatch(getRegimentById(id))
        dispatch(getAllDays(id))

    }, [user, message, isError, token, dispatch]);

    const createDays = () => {

        // Send Regiment 
        dispatch(createDay({ day: day, description: form.description, RegimentId: currentRegiment.id }))

        // Close Modal
        setOpen(false)

        // Reset Form 
        setForm(modalInitialState)

    }

    const updateDays = (form) => {
        const { description, currentId } = form
        dispatch(updateDay({ description, day, currentId }))

        // Close Modal
        setOpen(false)

        // Reset Form 
        setForm(modalInitialState)
    }

    // Reopens Edit Form
    const handleEdit = (day, description, id) => {
        // Open Form
        console.log(description)
        setOpen(true)
        // temp state change
        const obj = {
            description: description,
            btnName: "Update",
            title: "Update Regiment",
            currentId: id
        }

        // Set Form to Current Name and Description
        setForm(obj)

        setDay(day)

    }


    const handleDelete = (id) => {
        console.log(id)
        // Returns a message if success
        dispatch(deleteDay(id))
    }


    return (<>
        {user && currentRegiment && days ?
            <>
                <Navbar />
                <DashboardLayout routes={{ regiments: "/dashboard/regiments", exercises: "/dashboard/exercises", profile: "/dashboard/profile" }}>
                    <Paper elevation={0} >
                        <Title title={currentRegiment.name} />
                    </Paper>
                    <Paper elevation={2} className='dashboard-body-wrapper' component={'section'}>
                        {/* Days */}
                        <Box sx={{ padding: "0.75rem" }} component={"article"}>
                            <Typography component={'h4'} variant='h6' sx={{ textAlign: "center", marginBottom: "1.125rem", padding: "2rem" }} color="primary" >Workout Days</Typography>
                            {/* Body */}
                            <Container>
                                {days.map((day) =>
                                    <Container key={day.id} sx={{ padding: "1rem", marginBottom: "1.125rem" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, marginBottom: "1.125rem" }}>
                                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: "1.125rem" }}>
                                                <FaCalendar />
                                                <Typography sx={{ marginLeft: "20px" }} variant='h5' color={'primary'} fontWeight={'bold'}>{day.day}</Typography>
                                            </Box>

                                            <Typography variant='h4' component={'p'} marginBottom={"1.125rem"} color="text.secondary">{day.description}</Typography>

                                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                                <ButtonGroup sx={{ display: "flex", justifyContent: "center", marginRight: "20px" }}>
                                                    {days.length === 7 ? null : <Button variant="contained" fontWeight={'bold'} onClick={handleOpen}>Add a Day</Button>}
                                                </ButtonGroup>
                                                <EditIcon cursor={"pointer"} color="secondary" onClick={() => handleEdit(day.day, day.description, day.id)} />
                                                <DeleteIcon color="error" onClick={() => handleDelete(day.id)} cursor={"pointer"} />
                                            </Box>
                                        </Box>
                                        {/* Workout Plans */}
                                        <Container variant='outlined' sx={{ maxHeight: "800px", overflow: "scroll", padding: "1rem" }}>
                                            <Workouts id={day.id} currentId={currentRegiment.id} />
                                        </Container>
                                    </Container>

                                )}
                            </Container>
                        </Box>
                    </Paper>
                </DashboardLayout>
                {/* Modal Display */}
                <Modal handleClose={handleClose} open={open} sx={{ display: "flex" }} >
                    <Container sx={{ display: "flex", alignItems: "center", marginBottom: "1.125rem", justifyContent: "space-between" }}>
                        <Typography variant="h6" color={'primary'} fontWeight={'bold'} marginRight={"1.125rem"}>{form.title}</Typography>
                        <FaRegWindowClose fontSize={30} onClick={handleClose} />
                    </Container>
                    <Container sx={{ padding: "0px" }}>
                        <FormControl component={'form'} onSubmit={e => {
                            e.preventDefault()
                            form.btnName === "Submit" ?
                                createDays()
                                :
                                updateDays(form)

                        }}>
                            <Box sx={{ marginBottom: "1.125rem" }}>
                                <TextField id="Description" label="Description" variant="outlined" type={'text'} name="description" value={form.description} onChange={handleModalChange} required />
                            </Box>
                            <FormLabel id="demo-controlled-radio-buttons-group">Day</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={day}
                                onChange={handleChange}
                                required
                            >
                                <FormControlLabel value="Monday" control={<Radio />} label="Monday" />
                                <FormControlLabel value="Tuesday" control={<Radio />} label="Tuesday" />
                                <FormControlLabel value="Wednesday" control={<Radio />} label="Wednesday" />
                                <FormControlLabel value="Thursday" control={<Radio />} label="Thursday" />
                                <FormControlLabel value="Friday" control={<Radio />} label="Friday" />
                                <FormControlLabel value="Saturday" control={<Radio />} label="Saturday" />
                                <FormControlLabel value="Sunday" control={<Radio />} label="Sunday" />
                            </RadioGroup>

                            <ButtonGroup sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" type={'submit'}>{form.btnName}</Button>
                            </ButtonGroup>
                        </FormControl>
                    </Container>
                </Modal>
            </>
            :
            <Spinner />
        }

    </>
    );
}
// This also gets called at build time
export async function getServerSideProps(context) {
    return {
        props: {
            serverID: context.params.id
        }, // will be passed to the page component as props
    }
}
export default Regiment;