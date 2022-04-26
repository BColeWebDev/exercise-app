import { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Container, Box, Link, Modal, Input, FormControl, Button } from "@mui/material"
import { FaPencilAlt } from "react-icons/fa";
import { error, success } from "./notifications";
import Badge from "../commons/badge"
import { ToastContainer } from "react-toastify"
import axios from 'axios';
const Profile = ({ user, regiments }) => {
    // const { regiments } = useSelector((state) => state.regiments)

    const { firstname, lastname, experience, id, email, bio, token } = user
    const [file, setFile] = useState()
    // const [avatar, setavatar] = useState();
    const [open, setOpen] = useState(false);

    // Hanlding State 
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFile("")
    };

    // TODO: Look up S3 Bucket and how to use images. 
    useEffect(async () => {
        // get user avatar
        // await axios.get(`http://localhost:5000/api/v1/users/avatar/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(response => console.log(response))



    }, []);


    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("image", file)
        formData.append("id", id)
        const result = await axios.post('http://localhost:5000/api/v1/users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })
        return result.data
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (<>
        {/* Profile */}
        <Paper elevation={1} sx={{ padding: '1.125rem', maxWidth: "430px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.125rem" }}>
            <Container sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "1rem" }}>
                <Typography variant='h4' component={'h2'} color="primary">Profile</Typography>
                <Badge label={experience ? experience : "beginner"}></Badge>
            </Container>
            <Container sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>

                <Box sx={{ display: "flex" }}>
                    <Typography variant='subtitle' component={'h4'}>ID: {id}</Typography>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        {/* Avatar */}
                        <Avatar sx={{ marginRight: "10px" }} alt={`${firstname} ${lastname}`}></Avatar >
                        <FaPencilAlt onClick={handleOpen} cursor={"pointer"} />
                    </Box>
                </Box>

            </Container>
            <Container>
                <Typography variant="subtitle1" component={'h3'} color="primary" fontWeight={'bold'}>Name <br></br></Typography>
                <Typography variant="subtitle1" component={'h3'}>{`${firstname} ${lastname}`}</Typography>
                <Typography variant="subtitle1" component={'h3'} color="primary" fontWeight={'bold'}>Email <br></br></Typography>
                <Typography variant="subtitle1" component={'h3'}>{email}</Typography>
            </Container>
        </Paper>

        {/* Bio */}
        <Paper elevation={1} sx={{ padding: '1.125rem', maxWidth: "430px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.125rem" }}>
            <Typography variant='h4' component={'h2'} color="primary">Bio</Typography>
            <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="body1" component={'h2'} sx={{ marginBottom: "1.125rem" }} >{bio ? bio : "no bio created"}</Typography>
            </Container>
        </Paper>
        {/* Regiments */}
        <Paper elevation={1} sx={{ padding: '1.125rem', maxWidth: "430px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.125rem" }}>
            {regiments ?
                <>
                    <Typography variant='h4' component={'h2'} color="primary">Regiments</Typography>
                    <Container sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", marginBottom: "1.125rem" }}>
                        <Typography className='h4' component={'h2'} color="primary" fontWeight={'bold'}>Total Regiments</Typography>
                        <Typography className='h4' component={'h2'}>{regiments.length}</Typography>
                    </Container>
                    <Container sx={{ display: "flex", justifyContent: "center" }}>

                        <Link href={'dashboard/regiments'} textAlign={'center'}>Go To Regiments</Link>
                    </Container>

                </>
                :
                <>
                    <Typography>No Regiments</Typography>
                </>
            }

        </Paper>

        {/* Modal  */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Upload Avatar Image
                </Typography>
                <FormControl component={'form'} onSubmit={e => {
                    e.preventDefault()
                    if (file === "") {
                        error('No Image! please add a image')
                        handleClose()
                    }
                    else {
                        const { message } = onSubmit()
                        success(message)
                        handleClose()
                    }
                }}>
                    <Input type={"file"} onChange={fileSelected} accept="image/*"></Input>
                    <Button type='submit' variant='contained'>Submit</Button>
                </FormControl>
            </Box>
        </Modal>
        <ToastContainer />
    </>);

}

export default Profile;