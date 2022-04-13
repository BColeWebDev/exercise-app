import axios from "axios";


// Plans Route - Creating workout plans 

// GET  - Get all Workout Plans
// POST - Create Workout Plans
// PUT - Update workout Plans (plan ID)
// DELETE - Delete workout plans (plan ID)



const getAllGoals = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(process.env.API_URL + "goals", config)
    return response.data

}

const createGoal = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(process.env.API_URL + "goals", data, config)

    return response.data
}

const updateGoal = async (data, token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `goals/${id}`, data, config)

    return response.data
}

const deleteGoal = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(process.env.API_URL + `goals/${id}`, config)

    return response.data
}

const plansServices = {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal
}

export default plansServices