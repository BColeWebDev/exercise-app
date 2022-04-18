import axios from "axios"

// Login User - Sends user info
const login = async (userData) => {

    //process.env.API_URL
    const response = await axios.post(process.env.API_URL + 'users/login', userData)
    // returns web token
    const { token } = response.data
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', JSON.stringify(token))
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}

// Register User
const register = async (userData) => {
    const response = await axios.post(process.env.API_URL + "users/register", userData)
    return response.data
}


const authService = {
    login, logout, register
}
export default authService