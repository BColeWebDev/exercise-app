import {useState} from 'react'
import { Typography, Container, Fab, Box, IconButton, Paper} from "@mui/material";
import { useSelector} from "react-redux";
import Navbar from '../../src/components/commons/navbar';
import DashboardLayout from '../../src/components/page-components/dashboard-layout';
import Spinner from "../../src/components/commons/spinner"
import Regiment from "../../src/components/page-components/Regiment"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView"


const Regiments = () => {
    const { user } = useSelector((state) => state.auth)
    console.log(user)
    const initalState = { list: "secondary", grid: "info", display: "dashboard-body__list", cardDisplay: "dashboard-card__list" }
    const [view, setview] = useState(initalState);
    const hanldeView = () => {
        if (view.list === 'secondary') {
            setview({ list: "info", grid: "secondary", display: "dashboard-body__grid", cardDisplay: "dashboard-card__grid" })
        }
        if (view.grid === 'secondary') {
            setview(initalState)
        }
    }

    return (
 <>  
       {user ?
    <>
            <Navbar/>
        <DashboardLayout routes={{regiments:"regiments",exercises:"exercises", profile:"profile"}}>
            {/* Regiment Header */}
            <Paper elevation={2}>
            <Container className='dashbord-header'  sx={{marginBottom:"1.125rem"}}>
            <Typography textAlign={'Center'} padding={'1rem'} variant="h3" component={'h1'}>Regiments</Typography>
            <hr></hr>
            {/*Regiment Buttons */}
            <Box>
            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
            <Fab variant="extended" sx={{ fontWeight: "700"}} color="primary">Create +</Fab>
            </Box>

            </Box>
            <Box sx={{display:"flex",flexDirection:"column-reverse", alignItems:"flex-end"}}>
            <Typography  color="text.primary" fontSize={'20px'}>Results: {user.regiments.length} </Typography>

                <Container sx={{display:"flex", justifyContent:"flex-end"}} >
                <IconButton aria-label="list-view" onClick={hanldeView}>
                    <FormatListBulletedIcon color={view.list} fontSize="large" />
                </IconButton>
                <Typography fontSize={'40px'} color={'white'} >|</Typography>
                <IconButton onClick={hanldeView}>
                    <GridViewIcon color={view.grid} fontSize="large" />
                </IconButton>
                </Container>
            </Box>
            </Container>
            </Paper>
         
            <Paper className='dashboard-body-wrapper' elevation={0} sx={{height:"100%"}}>
            <Typography color="papayawhip" variant="h5" component={'h2'}  sx={{marginBottom:"1.125rem"}} >Custom Regiments</Typography>
            
            {/* All Regiments */}
            {user.regiments.length === 0 ?
            <Box>
            <Typography color="primary">No Regiments. Create a regiment</Typography>
            </Box> 
            :
            <Box component={'ul'} className={`dashboard-body ${view.display}`}>
            <Regiment user={user} display={view.cardDisplay}/>
             </Box>
            }
            </Paper>
           
        </DashboardLayout>
    </>
    :
    <Spinner/>
    }
    </>


    );
}
 
export default Regiments;