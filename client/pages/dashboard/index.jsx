import { Container,  Typography, Button, IconButton ,Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Card, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import FitnessCenterIcon from"@mui/icons-material/FitnessCenter"
import Spinner from "../../src/components/spinner"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import Regiment from "../../src/components/Regiment";
import Logo from "../../src/components/logo";
import {getExercises, reset} from "../../src/redux/features/exercises/exerciseSlice"
import Navbar from "../../src/components/navbar";

const Dashboard = () => {
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.auth)
    // TODO:Create exercise slice 
    // const {exercises, isLoading , isError, message} = useSelector((state)=> state.exercises)
    // console.log(exercises)
   
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

    // useEffect(() => {
    //     if (isError) {
    //       console.log(message)
    //     }
    
    //     if (!user || !token) {
    //       navigate('/login')
    //     }
    
    //     // dispatch(getExercises())
    
    //     return () => {
    //       dispatch(reset())
    //     }
    //   }, [user, isError, message, dispatch])

    //   if (isLoading) {
    //     return <Spinner />
    //   }    


    return (<>
    
    {user ?
    //  {/* Dashboard */}
    <>
        <Navbar/>
    <Box component={'section'}className="dashboard" >
       {/* Side Nav  */}
        <Box className="side-nav" sx={{backgroundColor:'#292929',display:{xs:'none'}}}>
       
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
    </>
    
    :
    <>
    {<Spinner/>}
    </>
    }</>);
}
 
export default Dashboard;