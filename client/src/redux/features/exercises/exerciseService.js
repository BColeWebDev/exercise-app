import axios from "axios";


// Exercises Routes

// GET - Get All Exercises
// GET Get all Body Parts
// GET - Get a Single Body Part
// GET - Get all MuscleGroup
// GET - Get Single Muscle Group
// GET - Get All Equipments
// GET - Get Single Equipment
// GET - Get By Name


const getAllExercises = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises`, config)
    return response.data
}


const getAllBodyParts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/targets/`, config)
    return response.data


}

const getSingleBodyPart = async (name, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/targets/${name}`, config)
    return response.data

}

const getAllMuscleGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/muscles}`, config)
    return response.data
}

const getSingleMuscleGroup = async (name, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/muscles/${name}`, config)
    return response.data

}

const getAllEquipments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/equipments`, config)
    return response.data
}
const getSingleEquipment = async (name, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/equipments/${name}`, config)
    return response.data

}

const exerciseServices = {
    getAllExercises,
    getAllEquipments,
    getAllBodyParts,
    getAllMuscleGroups,
    getSingleBodyPart,
    getSingleEquipment,
    getSingleMuscleGroup
}
export default exerciseServices

