const { User } = require("../models")
const { hash, compare } = require('../config/hash')
const { generateToken } = require("../config/jwt")
const { v4: uuidv4 } = require('uuid')
const { uploadFile, getFileStream, removeFile, removeAvatar } = require("../config/aws")

let error = { details: [] };

const registerUser = async (req, res) => {
    const { email } = req.body
    // use uuid and hash password to add to database

    // check to see if user already exist
    const userExist = await User.findOne({ where: { email: email } })
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
        // send user
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
    const { key } = req.params
    // Get User 
    const user = await User.findOne({ where: { id: key } })
    console.log(!user)
    if (!user) {
        error.details.push({ message: 'User could not be found' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []

    }
    if (!user.avatar) {
        error.details.push({ message: 'User does not have an avatar image' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {
        //     // Get User Avatar form S3 bucket
        try {
            const readStream = await getFileStream(user.avatar)
            // if readStream has a status code then return am image of null
            // else return image 
            console.log(readStream)
            readStream.statusCode ?
                res.json({ img: null }) :
                readStream.pipe(res)

        } catch (error) {
            error.details.push({ message: "Server Connection Failed" })
            res.status(403).json({ errors: error.details.map(err => err.message) })
            error.details = []
        }
    }
    console.log(user.avatar)
}

// Creating Image Avatar
const createAvatar = async (req, res) => {
    const { id } = req.body
    const file = req.file
    try {
        // Returns file results
        const results = await uploadFile(file)
        await removeFile(file.path)
        // check for user by email and updates avatar on server and pushes to s3
        await User.update({ avatar: results.Key }, { where: { id } })
        res.send({ imagePath: `/images/${results.Key}` })
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete Avatar
const deleteAvatar = async (req, res) => {
    const key = req.params.key
    try {
        await removeAvatar(key)
        await User.update({ avatar: null }, { where: { id: key } })
        res.json({ message: "Avatar Deleted" })
    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports = { registerUser, loginUser, authOLogin, getAvatar, createAvatar, deleteAvatar }