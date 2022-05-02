const validation = require("../config/validation")

// Validation of Register
const registerIsValid = async (req, res, next) => {

    // returns error if credentials are incorrect
    // goes to next middlware if correct

    const { error } = await validation.registerValidation(req.body)
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })


}

// Validation of Login

const loginIsValid = async (req, res, next) => {
    const { error } = await validation.loginValidation(req.body)
    // returns error if credentials are incorrect
    // goes to next middlware if correct
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })
}

const regimentIsValid = async (req, res, next) => {
    const { error } = await validation.regimentValidation(req.body)
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })
}
const DayIsValid = async (req, res, next) => {
    const { error } = await validation.trainingDaysValidation(req.body)
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })
}
const exerciseIsValid = async (req, res, next) => {
    console.log(req.body)
    const { error } = await validation.exercisesValidation(req.body)
    console.log(error)
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })
}

module.exports = { registerIsValid, loginIsValid, regimentIsValid, DayIsValid, exerciseIsValid }