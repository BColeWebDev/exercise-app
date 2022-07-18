import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getAllRegiments} from"../../src/redux/features/regiments/regimentsSlice"
import { reset } from "../../src/redux/features/auth/authSlice";
import Spinner from "../../src/components/commons/spinner"
import Navbar from "../../src/components/commons/navbar";
import DashboardLayout from "../../src/components/page-components/dashboard-layout";
import {useRouter} from "next/router"
import { Paper } from "@mui/material";
import Profile from "../../src/components/commons/profile";
import Title from "../../src/components/commons/title";


const Dashboard = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user, token, isLoading } = useSelector((state) => state.auth)
    const { regiments } = useSelector((state) => state.regiments)
  console.log(regiments)
    useEffect(() => {
        // user is not logged in anymore return to login page
        if (user === null || token === null) {
         router.push("/")
        }
          dispatch(reset())
          dispatch(getAllRegiments())
        
      }, [user, isLoading, token])

      if (isLoading) {
        return <Spinner />
      }    

    return (<>
    
    {user ?
    <>
        <Navbar/>
        <DashboardLayout routes={{regiments:"dashboard/regiments",exercises:"dashboard/exercises", profile:"dashboard/profile"}}>
          {/* Home Page Title */}
        {
          user ?
          <>
          <Paper elevation={0}>
          <Title title="Home"/>
          </Paper>
            {/* User Profile Section */}
            <Paper elevation={5} sx={{height:"100%"}} className='dashboard-body-wrapper'>
                 <Profile user={user} regiments={regiments}/>
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