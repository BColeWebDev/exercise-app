import { useState } from 'react';
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
    TextareaAutosize
} from '@mui/material';


const SignUp = () => {


    const initalState = {
        first_name: "",
        last_name: "",
        bio: "",
        email: "",
        password: "",
        renter_password: "",
    }

    const [form, setForm] = useState(initalState);
    const [value, setValue] = useState('female');

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
        console.log(obj)

    }
    return (<FormControl component="form"
        onSubmit={e => {
            e.preventDefault()
            hanldeSubmit()
        }
        }
        sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            padding: '5rem',
        }}
        autoComplete="off"
    >
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
                focused
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
                focused
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
                label="Renter - Password"
                color="primary"
                sx={{ marginBottom: "12px" }}
                focused
                fullWidth
                type='password'
                name='password'
                autoComplete='current-password'
                value={password}
                onChange={onChange}
            />
            <FormHelperText id="outlined-weight-helper-text" sx={{ color: "#FFFFFF", fontSize: "10px", textAlign: "left", margin: 0 }}>Minimum eight characters, at least one letter, capitalize letter one number and one special character</FormHelperText>
        </Box>

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
                focused
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
            <Button variant="contained" href="/login" >Login</Button>
        </ButtonGroup>
    </FormControl >);
}

export default SignUp;