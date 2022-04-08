import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, ButtonGroup, FormControl } from '@mui/material';
import {toast} from"react-toastify"
import{useSelector, useDispatch}from "react-redux";
import {login, reset} from"../src/redux/features/auth/authSlice";
import Spinner from '../src/components/spinner';

const Login = () => {
    const dispatch = useDispatch()
    // Login State
    const initalState = { email: "", password: "" }
    const [form, setForm] = useState(initalState);
    const { email, password } = form

    // Global State login
    const { user , isLoading , isError, isSuccess, message} = useSelector((state)=>state.auth)

    const onChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    // if depencies changes this will run
useEffect(() => {
    if(isError){
        toast.error(message)
    }
    // register successful or user logged in
    if(isSuccess || user){
       toast.success("success")
    }
    // reset global state
    dispatch(reset())

}, [user, isError, isSuccess, message, dispatch]);

    const hanldeSubmit = () => {

        // validating user data
        dispatch(login(form))

    }
    if(isLoading){
        return <Spinner/>
    }
    

    return (<>

        <FormControl component="form"
            onSubmit={e => {
                e.preventDefault()

                hanldeSubmit()
                setForm(initalState)
            }
            }
            sx={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                padding: '4rem',
                backgroundColor: "#292929",
            }}
            autoComplete="off"
        >
            <Box>
                <Typography variant='h3' component='h1' sx={{ textAlign: "center", marginBottom: "2.125rem", marginLeft:"15px", fontWeight: "bold" }} > Login</Typography>
            </Box>
            <Box sx={{
                width: "350px",
                marginBottom: "1.125rem"
            }}>
                <TextField
                    required
                    sx={{ width: 1 }}
                    id="email"
                    label="Email"
                    color="primary"
                    name='email'
                    focused
                    type="email"
                    autoComplete='username'
                    value={email}
                    onChange={onChange}
                />
            </Box>

            <Box sx={{
                width: "350px",
                marginBottom: "2.125rem",
            }}>

                <TextField
                    required
                    id="password"
                    label="Password"
                    color="primary"
                    focused
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
                <Button variant='outlined' color='secondary' sx={{ whiteSpace: 'nowrap' }} href="/register" >Sign Up</Button>
            </ButtonGroup>
        </FormControl>
    </>
    );
}

export default Login;