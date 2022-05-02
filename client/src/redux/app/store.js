import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import exerciseReducer from "../features/exercises/exerciseSlice"
import regimentReducer from "../features/regiments/regimentsSlice"
import dayReducer from "../features/training days/daySlice"
import plansReducer from "../features/plans/plansSlice"
// Manages Global State

export const store = configureStore({
    reducer: {
        auth: authReducer,
        exercises: exerciseReducer,
        regiments: regimentReducer,
        days: dayReducer,
        plans: plansReducer
    }

})
