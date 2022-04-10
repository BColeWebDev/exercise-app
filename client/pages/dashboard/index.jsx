import { Container,  Typography, Button, IconButton ,Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Card, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FitnessCenterIcon from"@mui/icons-material/FitnessCenter"
import Spinner from "../../src/components/spinner"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import Regiment from "../../src/components/Regiment";
import Navbar from "../../src/components/navbar"
import Logo from "../../src/components/logo";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const initalState = {list:"secondary", grid:"info",display:"dashboard-body__list", cardDisplay:"dashboard-card__list"}
    const [view, setview] = useState(initalState);

    const hanldeView = () =>{
        if(view.list === 'secondary'){
            setview({list:"info",grid:"secondary",display:"dashboard-body__grid", cardDisplay:"dashboard-card__grid"})
        }
        if(view.grid === 'secondary'){
            setview(initalState)
        }
    }    

    return (<>{user ?
    //  {/* Dashboard */}
    <Box component={'section'}className="dashboard" >
       {/* Side Nav  */}
       
       {/* <Navbar/> */}
        <Box className="side-nav" sx={{backgroundColor:'#292929',display:{xs:'none'}}}>
        <Box>
        <Logo route={'/dashboard'}/>
        </Box>
        <Box className="side-nav-content">
            <Box className="navbar" component={'nav'}>
                <List>
                    <ListItemButton className="nav-items" sx={{fontSize:"20px", fontWeight:"bold"}}><ListItemText primary="Exercises"/><ListItemIcon><FitnessCenterIcon className="icon"/></ListItemIcon></ListItemButton>
                    <ListItemButton className="nav-items" sx={{fontSize:"20px", fontWeight:"bold"}}><ListItemText primary="Exercises"/><ListItemIcon><FitnessCenterIcon className="icon"/></ListItemIcon></ListItemButton>
                    <ListItemButton className="nav-items" sx={{fontSize:"20px", fontWeight:"bold"}}><ListItemText primary="Exercises"/><ListItemIcon><FitnessCenterIcon className="icon"/></ListItemIcon></ListItemButton>
                </List>
            </Box>
        </Box>
        <Box className="profile-container">
        <Typography className="side-nav-content" variant="h5">Profile</Typography>
        </Box >
        </Box>

        {/* Dashboard Content */}
  {/* Title */}
<Box className="dashboard-content">
  <Typography variant="h5" component="h1" padding={'2.25rem'} textAlign={'center'}>Welcome, {user.firstname}</Typography> 


{/* Regiments Container */}
<Box sx={{ display:{md:"flex"}}}>
{/* Custom Regiments */}
<Container className="custom-regiments"  component={'article'} >
<Box sx={{display:"flex", justifyContent:"space-between", justifyContent:"flex-end"}}>
            <Box display={'flex'} alignItems="center">
                <IconButton aria-label="list-view" onClick={() => hanldeView()}>
                <FormatListBulletedIcon color={view.list} fontSize="large"/>
                </IconButton>
                 <Typography fontSize={'40px'} color={'white'} >|</Typography>  
                 <IconButton onClick={() => hanldeView()}>
                     <GridViewIcon  color={view.grid} fontSize="large"/>
                 </IconButton>
</Box>
</Box>
<Typography variant="h5" component={'h2'}  sx={{color:"#F7E7CD"}} >Custom Regiments</Typography> 
<Box sx={{display:"flex", justifyContent:"space-between", justifyContent:"flex-end"}}>
    <Fab variant="extended" sx={{ fontWeight: "700"}} color="primary">Create +</Fab>
</Box>
{/* Regiment */}
<Typography>Results: {user.regiments.length}</Typography>
<Box component={'ul'} className={`dashboard-body ${view.display}`}>
        <Regiment user={user} display={view.cardDisplay}/>
</Box>
</Container>



{/* Preset Regiment */}
<Container component={'article'} >
<Typography variant="h5"  sx={{color:"#F7E7CD"}} >Preset Regiments</Typography> 
{/* Workouts */}
<Box className={`dashboard-body ${view.display}`}>
    <Card className="dashboard-card">
     <h1>Workout 1</h1>
    </Card>
    <Card className="dashboard-card">
     <h1>Workout 1</h1>
    </Card>
</Box>
</Container>

</Box>         
</Box>
</Box>
    :
    <>
    {<Spinner/>}
    </>
    }</>);
}
 
export default Dashboard;