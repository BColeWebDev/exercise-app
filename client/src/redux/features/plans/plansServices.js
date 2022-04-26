import axios from "axios";


// Plans Route - Creating workout plans 

// GET  - Get all Workout Plans
// GET - Get Workout Plan (training ID)
// POST - Create Workout Plans
// PUT - Update workout Plans (plan ID)
// DELETE - Delete workout plans (plan ID)



const getAllPlans = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + "exercises/plans", config)
    return response.data

}

const createPlan = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(process.env.API_URL + "exercises/plans", data, config)

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