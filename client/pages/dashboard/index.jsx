import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { reset } from "../../src/redux/features/auth/authSlice";
import Spinner from "../../src/components/commons/spinner"
import Navbar from "../../src/components/commons/navbar";
import DashboardLayout from "../../src/components/page-components/dashboard-layout";
import {useRouter} from "next/router"
import { Container,Typography,Paper } from "@mui/material";


const Dashboard = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user, token, isLoading } = useSelector((state) => state.auth)
   
    useEffect(() => {
        // user is not logged in anymore return to login page
        if (user === null || token === null) {
         router.push("/")
        }
          dispatch(reset())
        
      }, [user, isLoading, token])

      if (isLoading) {
        return <Spinner />
      }    

    return (<>
    
    {user ?
    <>
        <Navbar/>
        <DashboardLayout routes={{regiments:"dashboard/regiments",exercises:"dashboard/exercises", profile:"dashboard/profile"}}>
        {
          user ?
          <>
              <Paper elevation={2}>
                      <Container sx={{marginBottom:"1.125rem"}}>
                      <Typography textAlign={'Center'} padding={'2rem'} variant="h3" component={'h1'}>Home</Typography>
                      <hr></hr>
                      </Container>
                    </Paper>     
               <Paper elevation={0} sx={{height:"100%"}} className='dashboard-body-wrapper'>
               <Typography>Home</Typography>
             </Paper>
          </>      

        :
        <>
        <Spinner/>
        </>
        }
        </DashboardLayout>
    </>
    
    :
    <>
    <Spinner/>
    </>
    }</>);
}
 
export default Dashboard;