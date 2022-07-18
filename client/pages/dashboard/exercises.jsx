import { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import Spinner from "../../src/components/commons/spinner"
import Navbar from "../../src/components/commons/navbar";
import DashboardLayout from "../../src/components/page-components/dashboard-layout";
import {useRouter} from "next/router"
import {getExercises, getAllByNames, getByName, reset} from"../../src/redux/features/exercises/exerciseSlice";
import { Container, Typography, Paper, Button,} from "@mui/material";
import PaginationControlled from "../../src/components/commons/pagination";
import Filter from "../../src/components/commons/filter"
import {FaArrowDown, FaArrowUp} from "react-icons/fa"
import Title from "../../src/components/commons/title";

const Exercises = () => {   
    const dispatch = useDispatch()
    const router = useRouter()
    const initalState = { display:"none", fade: false}
    const [display, setdisplay] = useState(initalState);
    const handleDisplay = (display) => setdisplay(display);
    const { user, token, isLoading } = useSelector((state) => state.auth)
    const {exercises, names} = useSelector((state) => state.exercises)

    const onSubmit =(query)=>{
        const {radioValue, value} = query
            dispatch(getByName(`${radioValue}/${value}`))
            setdisplay(initalState)
    }

    useEffect(() => {
        // user is not logged in anymore return to login page
        if (user === null || token === null) {
         router.push("/")
        }
        // Get all Exercises 
        dispatch(getExercises())

        return () =>{
            dispatch(reset())
        }
      }, [user, isLoading, token])
   
      useEffect(() => {
        // Get All Body Parts
        dispatch(getAllByNames('targets'))
    }, []);


    return (
    <>  
       {user || exercises || names ?
    <>
        <Navbar/>
        <DashboardLayout routes={{regiments:"regiments",exercises:"exercises", profile:"profile"}}>
        {/* Heading */}
        {exercises ? <>
         <Paper elevation={0} >
        <Title title={"Exercise"}/>
            <Container sx={{marginBottom:"1.125rem" }}>
            {/* Display Filters */}
            <Container sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Filter onSubmit={onSubmit} names={names} display={display} />    
            {display.display === "none" && display.fade === false ? <Button variant="outlined" onClick={() => handleDisplay({display:"block",fade:true})}>Filter...{<FaArrowDown/>}</Button> :<Button variant="outlined"  onClick={() => handleDisplay({display:"none",fade:false})}>Filter...{<FaArrowUp/>}</Button>  }       
            </Container>

            {/* Results */}
            <Typography textAlign={'right'} color="text.primary" >Results: {exercises.length}</Typography>
            </Container>
            </Paper>
               {/* Pagination */}
<Paper elevation={5} sx={{height:"100%"}} className='dashboard-body-wrapper'>
 <PaginationControlled data={exercises}/>
</Paper>
        </>

         : <Spinner/>}
        </DashboardLayout>
    </>
    
    :

    <Spinner/>
    }
    </>
    );
}
 
export default Exercises;

