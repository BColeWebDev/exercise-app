const Joi = require("joi")

// Validation Schema
const registerSchema = Joi.object({
    first_name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .min(3)
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    ,

    //Minimum eight characters, at least one letter and one number:
    password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
})

const loginSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

    password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()

})


const regimentSchema = Joi.object({
    name: Joi.string()
        .required(),
    description: Joi.string()
        .required()
})

const daySchema = Joi.object({
    day: Joi.string()
        .required(),
    description: Joi.string()
        .required()

})

class Validation {

    // Validation for registering user
    registerValidation = (data) => {
        // checks if text is not blank   
        const { email, password, first_name, last_name } = data
        const response = registerSchema.validate({ email, first_name, last_name, password }, { abortEarly: false })
        return response
    }
    loginValidation = (data) => {
        const { email, password } = data
        const response = loginSchema.validate({ email, password }, { abortEarly: false })
        return response
    }
    regimentValidation = (data) => {
        const { name, description } = data
        const response = regimentSchema.validate({ name, description }, { abortEarly: false })
        return response
    }
    trainingDaysValidation = (data) => {
        const { day, description } = data
        const response = daySchema.validate({ day, description }, { abortEarly: false })
        return response
    }


}
module.exports = new Validation()