const express = require("express")
const router = express.Router()
const users = require("../controllers/users")
const { isAuthenticated } = require("../middleware/authMiddleware")
const { registerIsValid, loginIsValid } = require("../middleware/validation")
const multer = require('multer')
const upload = multer({ dest: "uploads/" })
//User Routes Routes 

// POST - create user 
// GET - Login w email 
// GET - Login w AuthO Google
// GET - get user Avatar
// POST - create Avatar
// PUT - update Avatar


router.route('/register')
    .post(registerIsValid, users.registerUser)
router.route("/login")
    .post(loginIsValid, users.loginUser)
router.route("/authO")
    .post(users.authOLogin)
router.route('/avatar')
    .post(isAuthenticated, upload.single('image'), users.createAvatar)
router.route('/avatar/:key')
    .get(isAuthenticated, users.getAvatar)
    .delete(isAuthenticated, users.deleteAvatar)


module.exports = router