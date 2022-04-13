import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
// import exerciseReducer from "../features/exercises/exerciseSlice"
// Manages Global State

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // exercises: exerciseReducer
    }

})
