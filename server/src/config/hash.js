// Hashing Password using Bcrypt
const bcrypt = require("bcryptjs")


// rounds - number of hashes
// password - client enter password 
const hash = async (rounds, password) => {
    const salt = await bcrypt.genSalt(rounds)

    return bcrypt.hash(password, salt)

}

// bodyPassword compared from client-side
// dbPassword compared from database
const compare = async (bodyPassword, dbPassword) => {
    return bcrypt.compare(bodyPassword, dbPassword)
}
module.exports = { hash, compare }
