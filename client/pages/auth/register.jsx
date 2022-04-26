import { useState, useEffect} from 'react';
import {
    Box,
    TextField,
    Typography,
    FormHelperText,
    Button,
    ButtonGroup,
    FormControl,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio,
    Container,
    TextareaAutosize,
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel
} from '@mui/material';
import Navbar from '../../src/components/commons/navbar';
import {useRouter} from "next/router"
import{useSelector, useDispatch}from "react-redux"
import {success, error} from "../../src/components/commons/notifications"
import Spinner from '../../src/components/commons/spinner';
import {reset,register} from"../../src/redux/features/auth/authSlice"
import { ToastContainer} from "react-toastify"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
    const router  = useRouter()
    const dispatch = useDispatch()
    const { isLoading , isError, isSuccess, message} = useSelector((state)=>state.auth)

    const initalState = {
        first_name: "",
        last_name: "",
        bio: "",
        email: "",
        password: "",
        renter_password: "",
        showPassword: false,
    }

    useEffect(() => {
        if(isError){
            error(message)
        }
        if(isSuccess){
            success("User Created!")
            router.push("/")
        }
        dispatch(reset())
        
    }, [isLoading,isError, isSuccess, message ]);

    const [form, setForm] = useState(initalState);
    const [value, setValue] = useState(' ');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const {
        first_name,
        last_name,
        renter_password,
        email,
        password,
        bio
    } = form

    const onChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const hanldeSubmit = () => {
        const obj = { ...form, value }
        dispatch(register(obj))

    }

    const handleClickShowPassword = () => {
        setForm({
          ...form,
          showPassword: !form.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    if(isLoading){
        return <Spinner/>
    }

    return (<>
        <Navbar  routes={{login:"login",register:"register"}} />

        
    <FormControl component="form"
        onSubmit={e => {
            e.preventDefault()
           
            //if password does not match
                              
            password !== renter_password ?
                     
            error("Error password does not match!")
        
            :
            // handle submit of form
            hanldeSubmit()
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
            }}>
        <Box>
            <Typography variant='h3' component='h1' sx={{ textAlign: "center", marginBottom: "2.125rem", fontWeight: "bold" }}>Register</Typography>
        </Box>
        <Box sx={{
            width: "350px",
            marginBottom: "1.125rem"
        }}>
            <TextField
                required
                sx={{ width: 1 }}
                id="first_name"
                label="First Name"
                color="primary"
                name='first_name'
                type="first_name"
                autoComplete='username'
                value={first_name}
                onChange={onChange}
            />
        </Box>
        <Box sx={{
            width: "350px",
            marginBottom: "1.125rem"
        }}>
            <TextField
                required
                sx={{ width: 1 }}
                id="last_name"
                label="Last Name"
                color="primary"
                name='last_name'
                type="last_name"
                autoComplete='username'
                value={last_name}
                onChange={onChange}
            />
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
                type="email"
                autoComplete='username'
                value={email}
                onChange={onChange}
            />
        </Box>

        <FormControl sx={{
            width: "350px",
            marginBottom: "2.125rem",
        }}>
               <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                required
                id="password"
                label="Password"
                color="primary"
                sx={{ marginBottom: "12px" }}
                fullWidth
                type={form.showPassword ? 'text' : 'password'}
                name='password'
                autoComplete='current-password'
                value={password}
                onChange={onChange}
                endAdornment={<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {form.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>}

            />
            <FormHelperText id="outlined-weight-helper-text" sx={{ color: "#FFFFFF", fontSize: "10px", textAlign: "left", margin: 0 }}>Minimum eight characters, at least one letter, capitalize letter one number and one special character</FormHelperText>
        </FormControl>

        <Box sx={{
            width: "350px",
            marginBottom: "2.125rem",
        }}>

            <TextField
                required
                id="renter_password"
                label="Renter-Password"
                color="primary"
                sx={{ marginBottom: "12px" }}
                fullWidth
                type='password'
                name='renter_password'
                autoComplete='current-password'
                value={renter_password}
                onChange={onChange}
            />
        </Box>

        <FormLabel id="controlled-radio-buttons-group" color='primary'>Experience</FormLabel>
        <FormControl xs={{ margin: "10px" }}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                required
            >
                <FormControlLabel value="beginner" name="beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="intermediate" name='intermediate' control={<Radio />} label="Intermediate" />
                <FormControlLabel value="advance" name='advance' control={<Radio />} label="Advance" />
            </RadioGroup>
        </FormControl>
        <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Bio"
            maxLength={140}
            name="bio"
            value={bio}
            onChange={onChange}
            style={{ width: 350, padding: "1.125rem", height: 200, backgroundColor: "#292929", color: "#FFFFFF", marginBottom: "1.125rem" }}
        />
        <ButtonGroup sx={{ display: "flex", marginBottom: "2.125rem" }}>
            <Button variant='outlined' color='secondary' sx={{ whiteSpace: 'nowrap', marginRight: "20px" }} type="submit" >Sign Up</Button>
            <Button variant="contained" href="/auth/login" >Login</Button>
        </ButtonGroup>
        </Container>
        <ToastContainer/>
    </FormControl >
    </>
    );
}

export default SignUp;