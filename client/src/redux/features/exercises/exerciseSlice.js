import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exerciseServices from "./exerciseService"

const initialState = {
    exercises: null,
    names: null,
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

// Get by names
export const getAllByNames = createAsyncThunk('exercises/names',

    async (query, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await exerciseServices.getAllNames(token, query)
        } catch (error) {

            console.log(error)
        }
    })

export const getByName = createAsyncThunk('exercises/getName',
    async (query, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await exerciseServices.getAllNames(token, query)
        } catch (error) {
            console.log(error)
        }
    })





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

            // Get All By Names
            .addCase(getAllByNames.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllByNames.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.names = action.payload
            })
            .addCase(getAllByNames.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Get By Name
            .addCase(getByName.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getByName.fulfilled, (state, action) => {
                state.exercises = null
                state.isLoading = false
                state.isSuccess = true
                state.exercises = action.payload
            })
            .addCase(getByName.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }

})
export const { reset } = exerciseSlice.actions
export default exerciseSlice.reducer