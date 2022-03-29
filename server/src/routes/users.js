const express = require("express")
const router = express.Router()
const users = require("../controllers/users")
const { isAuthenticated } = require("../middleware/authMiddleware")
const { registerIsValid, loginIsValid } = require("../middleware/validation")
//User Routes Routes 

// POST - create user 
// GET - Login w email 
// GET - Login w AuthO Google


router.route('/register')
    .post(registerIsValid, users.registerUser)
router.route("/login")
    .post(loginIsValid, users.loginUser)
router.route("/authO")
    .post(users.authOLogin)


module.exports = router