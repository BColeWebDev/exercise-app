import axios from "axios";


// Regiment Route - Creating workout plans 

// GET  - Get all days (regiment ID)
// GET - get day by id (by training day id)
// POST - Create a day (regiment ID)
// PUT - Update day (Regiment ID)
// DELETE - Delete day (training ID)

const getAllDays = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get("http://localhost:5000/api/v1/" + `day/${id}`, config)
    console.log(response)
    return response.data

}

const createDay = async (data, token) => {
    const { day, description, RegimentId } = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post("http://localhost:5000/api/v1/" + `day/${RegimentId}`, { day, description, RegimentId }, config)

    return response.data
}
const getDayById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get("http://localhost:5000/api/v1/" + `day/name/${id}`, config)
    console.log(response.data)
    return response.data
}
const updateDay = async (data, token, id) => {
    const { day, description, currentId } = data
    console.log(id)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put("http://localhost:5000/api/v1/" + `day/${currentId}`, { day, description, RegimentId: id }, config)
    return response.data
}

const deleteDay = async (token, id) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete("http://localhost:5000/api/v1/" + `day/${id}`, config)

    return response.data
}

const daysServices = {
    getAllDays,
    getDayById,
    createDay,
    updateDay,
    deleteDay
}

export default daysServices