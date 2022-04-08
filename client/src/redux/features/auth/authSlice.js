import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService"

let user;
// user from local storage
if (typeof window !== 'undefined') {
    // Perform localStorage action
    user = JSON.parse(localStorage.getItem("user"))
}

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// Login user 
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        // returns user data from server
        return await authService.login(user)

    } catch (err) {
        const { status, statusText } = err.response
        const { error } = err.response.data
        console.log(error.message)
        // checks all possible errors returns specific message object
        const message = `Error: ${status} - Status: ${statusText} - Message ${error.message}`
        return thunkApi.rejectWithValue(message)
    }
})

// Register user 
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        // returns user data from server
        return await authService.register(user)

    } catch (err) {
        const { status, statusText } = err.response
        const { error } = err.response.data
        console.log(error.message)
        // checks all possible errors returns specific message object
        const message = `Error: ${status} - Status: ${statusText} - Message ${error.message}`
        return thunkApi.rejectWithValue(message)
    }
})

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})



// Setting Auth Global State

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reset the intital state
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            // fetchng the data - When register action is pending

            // updates the global state true 
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            // when data hase been received 
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // Login Case
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            // when data hase been received 
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // Logout the user and reset the state
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})


// sets reset set back initial state
export const { reset } = authSlice.actions

export default authSlice.reducer