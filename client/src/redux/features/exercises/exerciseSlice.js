import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseServices from "./exerciseService"

const initialState = {
    exercises: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getExercises = createAsyncThunk(
    'exercises/getAll',
    async (_, thunkAPI) => {
        try {
            // Get user token
            const token = thunkAPI.getState().auth.user
            return await exerciseServices.getAllExercises(token)

        } catch (error) {
            console.log(error)
        }
    }
)
export const exerciseSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // Actions of what the exercises can do 
    extraReducers: (builder) => {
        builder
            // Gets all Exercises
            .addCase(getExercises.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExercises.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.exercises = action.payload
            })
            .addCase(getExercises.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }

})
export const { reset } = exerciseSlice.actions
export default exerciseSlice.reducer