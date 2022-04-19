const needle = require("needle")
const { Exercise } = require('../models')
const { v4: uuidv4 } = require('uuid');

let error = { details: [] };
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
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

// List of all body parts 
const getAllBodyParts = async (req, res) => {
    console.log(req.params)

    try {
        const data = await proxy(req.method, "/bodyPartList")
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}


const getSingleBodyPart = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/bodyPart/${name}`)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const getAllMuscleGroups = async (req, res) => {

    try {
        const data = await proxy(req.method, "/targetList")
        res.json(data)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const getSingleMuscleGroup = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/target/${name}`)
        res.json(data)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []

    }
}


const getAllEquipments = async (req, res) => {
    try {
        const data = await proxy(req.method, "/equipmentList")
        res.json(data)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const getSingleEquipment = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/equipment/${name}`)
        res.json(data)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const getByName = async (req, res) => {
    const name = req.params.name
    try {
        const data = await proxy(req.method, `/name/${name}`)
        res.json(data)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}


const createWorkOutPlan = async (req, res) => {
    const id = uuidv4()
    try {
        const exercise = await Exercise.create({ id, ...req.body })
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
const updateWorkOutPlan = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.update(req.body, { where: { id } })
        res.json(exercise)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
const getAllWorkoutPlan = async (req, res) => {
    const { id } = req.body
    try {
        const exercise = await Exercise.findAll({ where: { regimentId: id } })
        res.json(exercise)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
const getSingleWorkout = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findOne({ where: { id } })
        res.json(exercise)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}
const deleteWorkoutPlan = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.destroy(req.body, { where: { id } })
        res.json(exercise)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
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