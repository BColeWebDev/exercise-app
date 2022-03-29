const needle = require("needle")
const { Exercise } = require('../models')
const { v4: uuidv4 } = require('uuid');

const proxy = async (method, query) => {
    const options = {
        "headers": {
            "x-rapidapi-host": `${process.env.API_HOST}`,
            "x-rapidapi-key": `${process.env.API_KEY}`
        }
    }
    const resData = await needle(`${method}`, `${process.env.API_URL}${query ? query : " "}`, options)
    const body = resData.body
    return body
}


// list of all exercises
const getAllExercises = async (req, res) => {
    try {
        const data = await proxy(req.method)
        res.json(data)

    } catch (error) {
        res.json(error)
    }
}

// List of all body parts 
const getAllBodyParts = async (req, res) => {
    console.log(req.params)

    try {
        const data = await proxy(req.method, "/bodyPartList")
        res.json(data)

    } catch (error) {
        res.json(error)
    }
}


const getSingleBodyPart = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/bodyPart/${name}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}

const getAllMuscleGroups = async (req, res) => {

    try {
        const data = await proxy(req.method, "/targetList")
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}

const getSingleMuscleGroup = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/target/${name}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}


const getAllEquipments = async (req, res) => {
    try {
        const data = await proxy(req.method, "/equipmentList")
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}

const getSingleEquipment = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/equipment/${name}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}

const getByName = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/name/${name}`)
        res.json(data)

    } catch (error) {

        res.json(error)

    }
}


const createWorkOutPlan = async (req, res) => {
    const id = uuidv4()
    try {
        const exercise = await Exercise.create({ id, ...req.body })
        res.json(exercise)
    } catch (error) {
        res.json(error)
    }
}
const updateWorkOutPlan = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.update(req.body, { where: { id } })
        res.json(exercise)
    } catch (error) {
        res.json(error)
    }
}
const getAllWorkoutPlan = async (req, res) => {
    try {
        const exercise = await Exercise.findAll({})
        res.json(exercise)

    } catch (error) {
        res.json(error)
    }
}
const getSingleWorkout = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findOne({ where: { id } })
        res.json(exercise)
    } catch (error) {
        res.json(error)
    }

}
const deleteWorkoutPlan = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.destroy(req.body, { where: { id } })
        res.json(exercise)
    } catch (error) {
        res.json(error)
    }

}

module.exports = {
    getAllExercises,
    getAllBodyParts,
    getAllEquipments,
    getAllMuscleGroups,
    getSingleBodyPart,
    getSingleMuscleGroup,
    getSingleEquipment,
    getByName,
    createWorkOutPlan,
    getAllWorkoutPlan,
    updateWorkOutPlan,
    deleteWorkoutPlan,
    getSingleWorkout
}