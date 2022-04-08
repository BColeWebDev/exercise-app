
import { Container, Grid, Typography, Button, IconButton ,Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const initalState = {list:"secondary", grid:"info"}
    const [view, setview] = useState(initalState);

    //TODO: Fix login issue for showing up null
    // TODO: Fix list/view display
    const hanldeView = () =>{
        if(view.list === 'secondary'){
            setview({list:"info",grid:"secondary"})
        }
        if(view.grid === 'secondary'){
            setview({list:"secondary",grid:"info"})
        }
    }    

    return (<>
    <Container component={'section'}>
        {user ?
             <>
             {/* Title */}
            <Typography variant="h4" padding={'2.25rem'} textAlign={'center'}>Welcome, {user.email}</Typography> 

            <Grid spacing={2}>
                     {/* Custom Regiments */}
            <Container sx={{backgroundColor:"#292929", padding:'1.5rem'}}>
            <Typography variant="h5" marginBottom={"1.125rem"} sx={{color:"#F7E7CD"}} >Custom Regiments</Typography> 
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Button variant="contained" sx={{padding:"0px 40px", fontSize:"30px"}}>+</Button>
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
            </Container>

               {/* Custom Regiments */}
               <Container sx={{backgroundColor:"#292929", padding:'1.5rem'}}>
            <Typography variant="h5" marginBottom={"1.125rem"} sx={{color:"#F7E7CD"}} >Custom Regiments</Typography> 
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Button variant="contained" sx={{padding:"0px 40px", fontSize:"30px"}}>+</Button>
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
            </Container>
                </Grid>
            </>
        : 
        
        <h1>Error</h1> }


    </Container>
    </>
    
  );
} 

export default Dashboard;