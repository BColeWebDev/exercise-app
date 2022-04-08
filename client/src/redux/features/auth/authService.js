import axios from "axios"

// Login User - Sends user info
const login = async (userData) => {

    const response = await axios.post(process.env.API_URL + "users/login", userData)
    // returns web token
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    login, logout
}
export default authService