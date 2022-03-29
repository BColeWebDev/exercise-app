const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middleware/authMiddleware")
const exercisesRoutes = require("../routes/exercises")
const usersRoutes = require("../routes/users")
const regimentsRouter = require("../routes/regiments")
const goalsRouter = require("../routes/goals")
const dayRouter = require("../routes/training-day")
// Initial Routes

// Exercises 
// Users
// Regiments
router.use('/day', isAuthenticated, dayRouter)
router.use('/exercises', isAuthenticated, exercisesRoutes)
router.use("/users", usersRoutes)
router.use('/regiments', isAuthenticated, regimentsRouter)
router.use("/goals", isAuthenticated, goalsRouter)


module.exports = router