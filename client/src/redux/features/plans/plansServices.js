import axios from "axios";


// Plans Route - Creating workout plans 

// GET  - Get all Workout Plans (Training ID)
// GET - Get Workout Plan (Training ID)
// POST - Create Workout Plans (Training ID)
// PUT - Update workout Plans (Training ID)
// DELETE - Delete workout plans (Training ID)



const getAllPlans = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + `exercises/plans/${id}`, config)
    return response.data
}


const createPlan = async (id, data, token) => {
    console.log(data)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(process.env.API_URL + `exercises/plans/${id}`, data, config)
    return response.data
}

const updatePlan = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `exercises/plans/${id}`, data, config)

    return response.data
}

const deletePlan = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `exercises/plans/${id}`, config)

    return response.data
}

const plansServices = {
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan
}

export default plansServices