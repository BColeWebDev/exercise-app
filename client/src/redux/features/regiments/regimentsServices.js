import axios from "axios";


// Regiment Route - Creating workout plans 

// GET  - Get all Regiments
// POST - Create a Regiment
// PUT - Update Regiment (regiment ID)
// DELETE - Delete Regiment (regiment ID)



const getAllRegiments = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + "regiments", config)
    return response.data

}

const createRegiment = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(process.env.API_URL + "regiments", data, config)

    return response.data
}

const updateRegiment = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `regiments/${id}`, data, config)
    return response.data
}

const deleteRegiment = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `regiments/${id}`, config)

    return response.data
}

const regimentsServices = {
    getAllRegiments,
    createRegiment,
    updateRegiment,
    deleteRegiment
}

export default regimentsServices