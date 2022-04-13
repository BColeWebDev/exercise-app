import axios from "axios";


// Regiment Route - Creating workout plans 

// GET  - Get all days
// POST - Create a day
// PUT - Update day (day ID)
// DELETE - Delete day (day ID)



const getAllDays = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + "days", config)
    return response.data

}

const createDay = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(process.env.API_URL + "days", data, config)

    return response.data
}

const updateDay = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `days/${id}`, data, config)
    return response.data
}

const deleteDay = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `days/${id}`, config)

    return response.data
}

const daysServices = {
    getAllDays,
    createDay,
    updateDay,
    deleteDay
}

export default daysServices