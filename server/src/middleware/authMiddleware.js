const { decodeToken } = require("../config/jwt")
const { User } = require("../models")

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization

    // verify token being sent from header 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json('No token provided')
    }

    // Get token from header
    let token = authHeader.split(' ')[1]
    try {
        // Verify token
        const { id } = decodeToken(token)
        // Get user from the token
        req.user = await User.findByPk(id)
        // Runs the next middlware

        next()
    } catch (error) {
        return res.status(401).json('Not Authorized')
    }
}
module.exports = { isAuthenticated }