import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getRegimentById, } from "../../../../src/redux/features/regiments/regimentsSlice"
import { error, success } from '../../../../src/components/commons/notifications';
import { getAllDays, createDay, deleteDay, updateDay } from '../../../../src/redux/features/training days/daySlice';
import { Container, Paper, Typography, Box, Card, ButtonGroup, Button, FormControl, TextField, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import Modal from "../../../../src/components/commons/modal"
import DashboardLayout from '../../../../src/components/page-components/dashboard-layout';
import Navbar from '../../../../src/components/commons/navbar';
import Badge from '../../../../src/components/commons/badge';
import { FaClock, FaCalendar, FaRegWindowClose } from "react-icons/fa"
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link"
const Regiment = ({ id }) => {
    // Global State
    const router = useRouter()
    const dispatch = useDispatch()
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
                    <Paper elevation={2}>
                        <Container className='dashbord-header' sx={{ marginBottom: "1.125rem" }}>
                            <Typography textAlign={'Center'} padding={'1rem'} variant="h3" component={'h1'}>Regiment</Typography>
                            <hr></hr>
                        </Container>

                    </Paper>
                    {/* Regiment Info */}
                    <Paper elevation={0} sx={{ height: "100%" }} className='dashboard-body-wrapper' component={'section'}>
                        <Paper elevation={1} sx={{ padding: '1.125rem', maxWidth: "430px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.125rem" }} component={"article"}>
                            <Typography variant='h5' component={'h2'} color="primary">Info</Typography>
                            <Container sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "1rem" }}>
                                <Typography>{currentRegiment.name}</Typography>
                                <Badge label={user.experience ? user.experience : "beginner"}></Badge>
                            </Container>
                            <Container sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant='subtitle' component={'h4'}>ID: {currentRegiment.id}</Typography>
                                </Box>
                            </Container>
                        </Paper>
                        {/* Bio */}
                        <Paper elevation={1} sx={{ padding: '1.125rem', maxWidth: "430px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.125rem" }} component={"article"}>
                            <Typography component={'h2'} variant='h5' color="primary" >Bio</Typography>
                            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
                                <Typography component={"p"} variant="body1" color={'secondary'}>{currentRegiment.description}</Typography>
                                <Box sx={{ display: "flex", alignItems: 'center' }}>
                                </Box>
                            </Container>
                            <Container>
                            </Container>
                        </Paper>

                        {/* Days */}
                        <Paper elevation={1} sx={{ padding: '0.75rem', maxWidth: "430px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.125rem" }} component={"article"}>
                            <Typography component={'h2'} variant='h5' color="primary" >Training Days</Typography>

                            <Container sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", marginBottom: "1.125rem" }}>
                                <FaClock />
                                <Typography variant="subtitle1" component={'h3'} color="primary"> {days.length} / 7 Days <br></br></Typography>
                            </Container>
                            {/* Body */}
                            <Container sx={{ maxHeight: "300px", overflow: "scroll" }}>
                                {days.map((day) =>
                                    <Card variant="outlined" key={day.id} sx={{ padding: "2rem", marginBottom: "1.125rem" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: "1.125rem" }}>
                                                <FaCalendar />
                                                <Typography variant='h5' >{day.day}</Typography>
                                            </Box>
                                            {/* Buttons */}
                                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <Box marginRight={"1.125rem"}>
                                                        <EditIcon cursor={"pointer"} onClick={() => handleEdit(day.day, day.description, day.id)} />
                                                    </Box>
                                                    <Box color={'primary'}>
                                                        <DeleteIcon color="error" onClick={() => handleDelete(day.id)} cursor={"pointer"} />
                                                    </Box>
                                                </Container>
                                            </Box>
                                        </Box>
                                        <Container sx={{ display: "flex", justifyContent: "center" }}>
                                            <Typography variant='body1' component={'p'}>{day.description}</Typography>
                                        </Container>
                                    </Card>
                                )}
                            </Container>
                            <ButtonGroup sx={{ display: "flex", justifyContent: "center", marginTop: "1.125rem" }}>
                                {days.length === 7 ? null : <Button variant='outlined' onClick={handleOpen} >Add a Day</Button>}
                            </ButtonGroup>
                            <Container>
                            </Container>
                        </Paper>
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
            <h1>Error on Load Refresh the Page</h1>
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