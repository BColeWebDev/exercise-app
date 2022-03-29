const jwt = require("jsonwebtoken")

// Generates JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

// Verfiy JWT Token
const decodeToken = (token) => {

    return jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
            return error
        }
        return decode
    })
}
module.exports = { generateToken, decodeToken }