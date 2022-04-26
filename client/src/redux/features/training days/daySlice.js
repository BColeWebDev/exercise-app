import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import daysServices from "./dayServices"
const initialState = {
    days: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// All Training Days
export const getAllDays = createAsyncThunk(
    'days/all', async (id, thunkAPI) => {
        try {
            // Get user token
            const token = thunkAPI.getState().auth.user.token

            return await daysServices.getAllDays(id, token)

        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Gets Training Day by Regiment ID 
export const getDayById = createAsyncThunk(
    'days/byID', async (id, thunkAPI) => {
        try {
            // Get user token
            const token = thunkAPI.getState().auth.user.token

            return await daysServices.getDayById(id, token)

        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Creates Training Day 
export const createDay = createAsyncThunk(
    'days/create',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            return await daysServices.createDay(data, token)

        } catch (err) {
            const { errors } = err.response.data
            // // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete Training Day
export const deleteDay = createAsyncThunk(
    'days/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            return await daysServices.deleteDay(token, id)

        } catch (err) {

            const { errors } = err.response.data
            // // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Update Training Day
export const updateDay = createAsyncThunk(
    'days/update',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const regimentId = thunkAPI.getState().regiments.currentRegiment.id
            return await daysServices.updateDay(data, token, regimentId)
        } catch (err) {
            const { errors } = err.response.data
            // // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }

    }
)




export const daysSlice = createSlice({
    name: 'days',
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
            // Gets All Days
            .addCase(getAllDays.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllDays.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.days = action.payload
            })
            .addCase(getAllDays.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Gets Days By ID
            .addCase(getDayById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDayById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.days = action.payload
            })
            .addCase(getDayById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Create Regiment 
            .addCase(createDay.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDay.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.days.push(action.payload)
                state.message = action.payload.message
            })
            .addCase(createDay.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Update Regiment
            .addCase(updateDay.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateDay.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(updateDay.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Delete Day
            .addCase(deleteDay.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDay.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteDay.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }

})

export const { reset } = daysSlice.actions
export default daysSlice.reducer