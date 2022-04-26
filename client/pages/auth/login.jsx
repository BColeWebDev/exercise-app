import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, ButtonGroup, FormControl, Container } from '@mui/material';
import { ToastContainer} from "react-toastify"
import{useSelector, useDispatch}from "react-redux";
import {login, reset} from"../../src/redux/features/auth/authSlice";
import {success, error} from "../../src/components/commons/notifications"
import Spinner from '../../src/components/commons/spinner';
import Navbar from '../../src/components/commons/navbar';
import {useRouter} from "next/router"
 
const Login = () => {
    // Global State login
    const { user, token, isLoading , isError, message} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const router  = useRouter()

    // Login State
    const initalState = { email: "", password: "" }
    const [form, setForm] = useState(initalState);
    const { email, password } = form

    

    const onChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


useEffect(() => {
    if(isError){
       error(message)
    }
    // // register successful or user logged in go to dashboard
    if(user !== null && token !== null){
        router.push('/dashboard')
    }
    // reset global state
    dispatch(reset())

}, [user, token, isError, message, dispatch]);

const hanldeSubmit = () => {
    
    dispatch(login(form))
        // validating user data
        
}

    if(isLoading){
        return <Spinner/>
    }
    

    return (<>
        <Navbar  routes={{login:"login",register:"register"}} />
        <FormControl component="form"
            onSubmit={e => {
                e.preventDefault()
                hanldeSubmit()
                setForm(initalState)
            }
            }
          sx={{ backgroundColor: "#292929", padding:"0.75rem" ,   display: { xs: 'flex' },width:{sm:"50%"}, marginLeft:"auto",marginRight:"auto", marginTop:"3rem" }}
            autoComplete="off"
        >
        <Container sx={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                paddingLeft:0,
                paddingRight:0,
                paddingTop:"2.75rem",
                paddingBottom:"2.75rem"
            }} >
        <Box>
                <Typography variant='h3' component='h1' sx={{ textAlign: "center", marginBottom: "2.125rem", marginLeft:"15px", fontWeight: "bold" }} > Login</Typography>
            </Box>
            <Box sx={{
                width: {xs:'100%', sm:"350px"},
                marginBottom: "1.125rem"
            }}>
                <TextField
                    required
                    sx={{ width: 1 }}
                    id="email"
                    label="Email"
                    color="primary"
                    name='email'
                    type="email"
                    autoComplete='username'
                    value={email}
                    onChange={onChange}
                />
            </Box>

            <Box sx={{
                width: {xs:'100%', sm:"350px"},
                marginBottom: "2.125rem",
            }}>

                <TextField
                    required
                    id="password"
                    label="Password"
                    color="primary"
                    fullWidth
                    type ='password'
                    name='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={onChange}
                />

            </Box>
            <ButtonGroup sx={{ display: "flex", marginBottom: "2.125rem" }}>
                <Button variant="contained" sx={{ marginRight: "20px" }} type="submit" >Login</Button>
                <Button variant='outlined' color='secondary' sx={{ whiteSpace: 'nowrap' }} href="/auth/register" >Sign Up</Button>
            </ButtonGroup>
        </Container>
        <ToastContainer/>
 </FormControl>
    </>
    );
}

export default Login;