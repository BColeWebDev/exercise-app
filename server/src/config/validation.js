const Joi = require("joi")

// Validation Schema
const registerSchema = Joi.object({
    first_name: Joi.string()
        .min(2)
        .max(35)
        .required()
        .messages({
            'string.empty': `first name cannot be an empty field`,
            'string.min': `first name should have a minimum length of 2 characters`,
            'string.max': `last name should have a minimum length of 35 characters`,
            'any.required': `first name is required field`
        })
    ,


    last_name: Joi.string()
        .min(2)
        .max(35)
        .required()
        .messages({
            'string.empty': `last name cannot be an empty field`,
            'string.min': `last name should have a minimum length of 2 characters`,
            'string.max': `last name should have a minimum length of 35 characters`,
            'any.required': `last name is required field`
        })
    ,

    email: Joi.string()
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .messages({
            'string.empty': `"email" cannot be an empty field`,
            'string.max': `email should have a minimum length of 30 characters`,
            'string.email': "must be a valid email",
            'any.required': `"email" is a required field`
        })
    ,

    //Minimum eight characters, at least one letter and one number:
    password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        .messages({
            'string.empty': `password cannot be an empty field`,
            'string.min': `password  should have a minimum length of 8 characters`,
            'string.pattern.base': `Invalid Password must contain: captialize letter, lower case letter, & special character`,
            'any.required': `password is required field`
        })
})


const loginSchema = Joi.object({
    email: Joi.string()

        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .messages({
            'string.empty': `email cannot be an empty field`,
            'string.max': `email should have a max of length of 30 characters`,
            'string.email': "must be a valid email",
            'any.required': `email is a required field`
        })
    ,
    password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        .messages({
            'string.empty': `password cannot be an empty field`,
            'string.min': `email should have a minimum length of 8 characters`,
            'string.pattern.base': `Invalid Password must contain: minimum 8 characters, captialize letter, lower case letter, & special character`,
            'any.required': `password is required field`
        })

})


const regimentSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(20)
        .messages({
            'string.max': `Regiment name can only have a max of length of 20 characters`,
            'any.required': `Regiment name is required field`
        })
    ,

    description: Joi.string()
        .required()
        .min(3)
        .max(20)
        .messages({
            'string.max': `Regiment description can only have a max of length of 20 characters`,
            'any.required': `Regiment description is required field`
        }),
    UserId: Joi.string()
        .required()
        .messages({
            'any.required': `UserID required field`
        })


})

const daySchema = Joi.object({
    day: Joi.string()
        .required()
        .min(3)
        .max(20)
        .messages({
            'string.max': `Training day name can only have a max of length of 20 characters`,
            'any.required': `Training day description is required field`
        })
    ,
    description: Joi.string()
        .required()
        .min(3)
        .max(20)
        .messages({
            'string.max': `Training day description can only have a max of length of 20 characters`,
            'any.required': `description is required field`
        })
})

const exercisesSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': `name is required field`
        }),
    equipment: Joi.string()
        .required()
        .messages({
            'any.required': `equipment is required field`
        }),
    muscle_target: Joi.string()
        .required()
        .messages({
            'any.required': `Muscle target is required field`
        }),
    bodyPart: Joi.string()
        .required()
        .messages({
            'any.required': `Body Part is required field`
        }),
    imageUrl: Joi.string()
        .required()
        .messages({
            'any.required': `Image Url is required field`
        }),
    TrainingDayId: Joi.string()
        .required()
        .messages({
            'any.required': `Exercises name is required field`
        })

})


class Validation {

    // Validation for registering user
    registerValidation = (data) => {
        // checks if text is not blank   
        const { email, password, first_name, last_name } = data
        const response = registerSchema.validate({ email, first_name, last_name, password }, { abortEarly: false })
        return response
    }
    // Login Valiation
    loginValidation = (data) => {
        const { email, password } = data
        const response = loginSchema.validate({ email, password }, { abortEarly: false })
        return response
    }
    // Regiment Valiation 
    regimentValidation = (data) => {
        const { name, description, UserId } = data
        const response = regimentSchema.validate({ name, description, UserId }, { abortEarly: false })
        return response
    }
    // Training Days Regiment
    trainingDaysValidation = (data) => {
        const { day, description } = data
        const response = daySchema.validate({ day, description }, { abortEarly: false })
        return response
    }
    exercisesValidation = (data) => {
        const { name, equipment, muscle_target, imageUrl, TrainingDayId, bodyPart } = data
        const response = exercisesSchema.validate({ name, equipment, muscle_target, imageUrl, TrainingDayId, bodyPart }, { abortEarly: false })
        return response
    }


}
module.exports = new Validation()