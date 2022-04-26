import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regimentsServices from "./regimentsServices";
const initialState = {
    regiments: [],
    currentRegiment: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllRegiments = createAsyncThunk(
    'regiments/all', async (_, thunkAPI) => {
        try {
            // Get user token
            const id = thunkAPI.getState().auth.user.id
            const token = thunkAPI.getState().auth.user.token

            return await regimentsServices.getAllRegiments(id, token)

        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getRegimentById = createAsyncThunk(
    'regiments/byID', async (id, thunkAPI) => {
        try {
            // Get user token
            const token = thunkAPI.getState().auth.user.token

            return await regimentsServices.getRegimentById(id, token)

        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createRegiments = createAsyncThunk(
    'regiments/create',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const id = thunkAPI.getState().auth.user.id
            return await regimentsServices.createRegiment(id, data, token)

        } catch (err) {
            const { errors } = err.response.data
            // // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteRegiment = createAsyncThunk(
    'regiment/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            return await regimentsServices.deleteRegiment(token, id)
        } catch (err) {
            const { errors } = err.response.data
            // // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const updateRegiment = createAsyncThunk(
    'regiment/update',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const id = thunkAPI.getState().auth.user.id
            return await regimentsServices.updateRegiment({ name: data.name, description: data.description, UserId: id }, token, data.id)

        } catch (error) {

        }
    }
)


export const regimentSlice = createSlice({
    name: 'regiments',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    // Actions of what the exercises can do 
    extraReducers: (builder) => {
        builder
            // Gets all Regiments
            .addCase(getAllRegiments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllRegiments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.regiments = action.payload
            })
            .addCase(getAllRegiments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Gets Regiment By ID
            .addCase(getRegimentById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRegimentById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.currentRegiment = action.payload
            })
            .addCase(getRegimentById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Create Regiment 
            .addCase(createRegiments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRegiments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.regiments.push(action.payload)
                state.message = action.payload.message
            })
            .addCase(createRegiments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Delete Regiment 
            .addCase(deleteRegiment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRegiment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(deleteRegiment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Update Regiment
            .addCase(updateRegiment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateRegiment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(updateRegiment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


    }

})

export const { reset } = regimentSlice.actions
export default regimentSlice.reducer