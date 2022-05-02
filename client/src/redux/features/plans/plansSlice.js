import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import planServices from "./plansServices"

const initialState = {
    plans: [],
    currentPlan: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllPlans = createAsyncThunk(
    'plans/all',
    async (id, thunkAPI) => {
        try {
            // id of the current regiment
            const token = thunkAPI.getState().auth.user.token
            return await planServices.getAllPlans(id, token)
        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const createPlan = createAsyncThunk(
    'plans/create',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await planServices.createPlan(data.TrainingDayId, data, token)
        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }

)
export const updatePlan = createAsyncThunk(
    'plans/update',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await planServices.createPlan(data.TrainingDayId, token, data)
        } catch (err) {
            const { errors } = err.response.data
            // checks all possible errors returns specific message object
            const message = `Error: ${err.response.status} - ${errors.map(err => " Message " + err)}`
            return thunkAPI.rejectWithValue(message)
        }
    }

)




export const PlansSlice = createSlice({
    name: 'exercise-plans',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    // Actions for Plans
    extraReducers: (builder) => {
        builder
            // Get
            .addCase(getAllPlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllPlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.plans = action.payload
            })
            .addCase(getAllPlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // Create  
            .addCase(createPlan.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.plans.push(action.payload)
                state.message = action.payload.message
            })
            .addCase(createPlan.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


    }

})


export const { reset } = PlansSlice.actions
export default PlansSlice.reducer