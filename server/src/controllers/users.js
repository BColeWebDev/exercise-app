const { User, Regiment, Training_Day } = require("../models")
const { hash, compare } = require('../config/hash')
const { generateToken } = require("../config/jwt")
const { v4: uuidv4 } = require('uuid')
const awsServices = require('../config/aws')

let error = { details: [] };

const registerUser = async (req, res) => {
    // use uuid and hash password to add to database

    // check to see if user already exist
    const userExist = await User.findOne({ where: { email: req.body.email } })
    if (userExist) {
        error.details.push({ message: "User already exists!" })
        res.status(409).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {
        // destrutures obj
        const { first_name, last_name, email, password, bio, experience } = req.body
        //generate user id 
        const id = uuidv4()

        // // Hashed Passwords
        const hashPassword = await hash(10, password)

        // // Generates JWT token with user ID
        const token = generateToken(id)
        // create user 
        const user = await User.create({
            id,
            first_name,
            last_name,
            email,
            password: hashPassword,
            bio,
            experience,
        })
        // if user exist 
        if (user) {
            res.status(200).json(
                {
                    id,
                    first_name,
                    last_name,
                    email,
                    experience,
                    bio,
                    token
                })

        } else {
            error.details.push({ message: "Invalid user data" })
            res.status(400).json({ errors: error.details.map(err => err.message) })
            error.details = []
        }
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body

    // check for user email 
    const user = await User.findOne({
        where: { email },
        include: [
            { model: Regiment, include: [Training_Day] }
        ]
    })


    // compares user and client password and db password 

    if (user && (await compare(password, user.password))) {
        res.status(200).json(
            {
                id: user.id,
                firstname: user.first_name,
                lastname: user.last_name,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar,
                experience: user.experience,
                token: generateToken(user.id),
                regiments: user.Regiments
            }
        )
    } else {
        error.details.push({ message: 'Invalid Credentials email or password is incorrect' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}
const authOLogin = async (req, res) => {
    resjson('google login')
}


// Get Avatar Image
const getAvatar = async (req, res) => {
    res.json("Get Avatar")
}

// Creating Image Avatar
const createAvatar = async (req, res) => {
    const file = req.file
    const description = req.body.description
    try {
        url = await awsServices(fileName, userId)
        res.status(200).json(url)
    } catch (error) {
        res.status(400).json(error)
    }
}
// Updating Avatar Image 
const updateAvatar = async (req, res) => {
    res.json("Update Avatar")
}





module.exports = { registerUser, loginUser, authOLogin, getAvatar, createAvatar, updateAvatar }