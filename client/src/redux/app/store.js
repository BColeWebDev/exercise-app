import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
// Manages Global State

export const store = configureStore({
    reducer: {
        auth: authReducer
    }

})
