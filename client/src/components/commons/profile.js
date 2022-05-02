import { Paper, Typography, Avatar, Container, Box, Link, Modal, Input, FormControl, Button } from "@mui/material"
import Badge from "../commons/badge"
import { ToastContainer } from "react-toastify"
const Profile = ({ user, regiments }) => {
    const { firstname, lastname, experience, id, email, bio, token } = user
    // Hanlding State 
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
        <ToastContainer />
    </>);

}

export default Profile;