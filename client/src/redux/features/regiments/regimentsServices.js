import axios from "axios";



// Regiment Route - Creating workout plans 

// GET  - Get all Regiments (by user id)
// POST - Create a Regiment (by user id)
// GET - get regiment by id (by regiment id)
// PUT - Update Regiment (regiment ID)
// DELETE - Delete Regiment (regiment ID)



const getAllRegiments = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `regiments/${id}`, config)
    return response.data
}

const getRegimentById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `regiments/name/${id}`, config)
    console.log(response.data)
    return response.data
}

const createRegiment = async (id, data, token) => {
    const { name, description } = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(process.env.API_URL + `regiments/${id}`, { name, description, UserId: id }, config)

    return response.data
}

const updateRegiment = async (data, token, id) => {
    const { name, description, UserId } = data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `regiments/${id}`, { name, description, UserId }, config)
    return response.data
}

const deleteRegiment = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(process.env.API_URL + `regiments/${id}`, config)

    return response.data
}

const regimentsServices = {
    getAllRegiments,
    getRegimentById,
    createRegiment,
    updateRegiment,
    deleteRegiment
}

export default regimentsServices