import { useState, } from 'react';
import { useDispatch } from "react-redux";
import { getAllByNames } from "../../redux/features/exercises/exerciseSlice";
import { Box, FormControl, Button, RadioGroup, Radio, FormControlLabel, FormLabel, Autocomplete, TextField, Grow } from "@mui/material";

const Filter = ({ onSubmit, names, display }) => {
    // Global State 
    const dispatch = useDispatch()


    // Component State  
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [radioValue, setRadioValue] = useState('targets');


    // Component Input Change
    const handleChange = (event) => {
        setRadioValue(event.target.value);
    };
    const handleClick = (event) => {
        getNames(event.target.value)
    }

    const getNames = (name) => {
        dispatch(getAllByNames(name))
    }




    return (<>{names ?
        <>

            <Grow in={display.fade}>
                <FormControl component={'form'} sx={{ display: display.display, backgroundColor: "black", padding: "1rem", transition: "ease-in-out" }} fullWidth onSubmit={e => {
                    e.preventDefault()
                    onSubmit({ value, radioValue })
                    setValue("")
                }}  >
                    <Box>
                        <FormControl>
                            <FormLabel id="radio-buttons-filter">Change options</FormLabel>
                            <RadioGroup
                                row
                                value={radioValue}
                                onChange={handleChange}
                                aria-labelledby="radio-buttons-filter"
                                name="radio-buttons-filter"
                                required
                            >

                                <FormControlLabel value="targets" control={<Radio onClick={e => {
                                    handleClick(e)
                                    setValue("")
                                }} />} label=" Body Parts" />
                                <FormControlLabel value="muscles" control={<Radio onClick={e => {
                                    handleClick(e)
                                    setValue("")
                                }} />} label=" Muscle Group" />
                                <FormControlLabel value="equipments" control={<Radio onClick={e => {
                                    handleClick(e)
                                    setValue("")
                                }} />} label=" Equipments" />
                            </RadioGroup>
                        </FormControl>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: "column" }}>

                        <Box sx={{ marginBottom: '1.125rem' }}>
                            <Autocomplete
                                required
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={names}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label={'Exercises'} />}
                            />
                        </Box>


                        <Box sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "1.125rem", marginBottom: "1.125rem" }}>
                            <Button variant="outlined" color="secondary" fullWidth type="submit" >Submit</Button>
                        </Box>
                    </Box>

                </FormControl>
            </Grow>

        </>
        :
        <p>Loading</p>
    }</>);
}

export default Filter