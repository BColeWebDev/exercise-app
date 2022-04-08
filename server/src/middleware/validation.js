const validation = require("../config/validation")

// Validation of Register
const registerIsValid = async (req, res, next) => {

    // returns error if credentials are incorrect
    // goes to next middlware if correct

    const { error } = await validation.registerValidation(req.body)
    if (error === undefined) {
        next()
    }
    else {
        res.send({ error: error.details })
    }

}

// Validation of Login

const loginIsValid = async (req, res, next) => {
    const { error } = await validation.loginValidation(req.body)
    // returns error if credentials are incorrect
    // goes to next middlware if correct
    if (error === undefined) {
        next()
    }
    else {
        res.status(400).send({ error: error.details[0] })
    }
}

const regimentIsValid = async (req, res, next) => {
    const { error } = await validation.regimentValidation(req.body)
    error === undefined ?
        next()
        :
        res.send({ error: error.details })
}
const DayIsValid = async (req, res, next) => {
    const { error } = await validation.trainingDaysValidation(req.body)
    error === undefined ?
        next()
        :
        res.send({ error })
}

module.exports = { registerIsValid, loginIsValid, regimentIsValid, DayIsValid }