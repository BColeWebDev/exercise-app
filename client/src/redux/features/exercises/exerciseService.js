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


const getAllNames = async (token, query) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/${query}`, config)
    return response.data
}
const getByName = async (token, query) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/${query}`, config)
    return response.data
}



const exerciseServices = {
    getAllExercises,
    getAllNames,
    getByName
}
export default exerciseServices

