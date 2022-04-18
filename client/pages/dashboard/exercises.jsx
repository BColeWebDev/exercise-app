import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { reset } from "../../src/redux/features/exercises/exerciseSlice";
import Spinner from "../../src/components/commons/spinner"
import Navbar from "../../src/components/commons/navbar";
import DashboardLayout from "../../src/components/page-components/dashboard-layout";
import {useRouter} from "next/router"
import {getExercises} from"../../src/redux/features/exercises/exerciseSlice";
import { Container, Typography, Paper } from "@mui/material";
import PaginationControlled from "../../src/components/commons/pagination";




const Exercises = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user, token, isLoading } = useSelector((state) => state.auth)
    const {exercises} = useSelector((state) => state.exercises)



    useEffect(() => {
        // user is not logged in anymore return to login page
        if (user === null || token === null) {
         router.push("/")
        }
        // // Get all Exercises
        dispatch(getExercises())

        return () =>{
            dispatch(reset())
        }
      }, [user, isLoading, token])

   

    return (
    <>  
       {user ?
    <>
        <Navbar/>
        <DashboardLayout routes={{regiments:"regiments",exercises:"exercises", profile:"profile"}}>
        {/* Heading */}
        {exercises ? <>
            <Paper elevation={2}>
            <Container sx={{marginBottom:"1.125rem"}}>
            <Typography textAlign={'Center'} padding={'2rem'} variant="h3" component={'h1'}>Exercises</Typography>
            <hr></hr>
            <Typography textAlign={'right'} color="text.primary" >Results: {exercises.length}</Typography>
            </Container>
            </Paper>
               {/* Pagination */}
               <Paper elevation={0} sx={{height:"100%"}} className='dashboard-body-wrapper'>
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

