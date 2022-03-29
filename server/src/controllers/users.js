const { User, Regiment, Training_Day } = require("../models")
const { hash, compare } = require('../config/hash')
const { generateToken } = require("../config/jwt")
const { v4: uuidv4 } = require('uuid');

// use uuid and hash password to add to database
const registerUser = async (req, res) => {

    // check to see if user already exist
    const userExist = await User.findOne({ where: { email: req.body.email } })
    console.log(userExist)
    if (userExist) {
        res.json({ error: "user already exist" })
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
            res.json(
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
            res.json('Invalid user data')
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
    console.log(user)

    // compares user and client password and db password 

    if (user && (await compare(password, user.password))) {
        res.json(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar,
                experience: user.experience,
                token: generateToken(user.id),
                regiments: user.Regiments
            }
        )
    } else {
        res.json("Invalid Credentials")
    }

}
const authOLogin = async (req, res) => {
    res.json('google login')
}


// const updateUser = async (req, res) => {
//     const user = await
// }
// const deleteUser = async (req, res) => {

// }

module.exports = { registerUser, loginUser, authOLogin }