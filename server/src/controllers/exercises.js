const needle = require("needle")
const { Exercise, Training_Day } = require('../models')
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


// Workout Plans 

// Plans Route - Creating workout plans 

// GET  - Get all Workout Plans (Training ID)
// GET - Get Workout Plan (Training ID)
// POST - Create Workout Plans (Training ID)
// PUT - Update workout Plans (Training ID)
// DELETE - Delete workout plans (Training ID)


const createWorkOutPlan = async (req, res) => {

    const day = await Training_Day.findByPk(req.body.TrainingDayId)
    if (!day) {
        error.details.push({ message: 'Invalid! Training Day does not exist' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {

        try {
            const id = uuidv4()
            const exercise = await Exercise.create({ id, ...req.body })
            res.status(200).json(exercise)
        } catch (err) {
            console.log(err)
            error.details.push({ message: 'Invalid! Cannot create workout' })
            res.status(403).json({ errors: error.details.map(err => err.message) })
            error.details = []
        }
    }


}
const updateWorkOutPlan = async (req, res) => {
    const { id } = req.params
    const { TrainingDayId } = req.body
    try {
        await Exercise.update(req.body, { where: { id, TrainingDayId } })
        res.status(200).json({ message: `Success! Updated ${req.body.name}` })
    } catch (err) {
        error.details.push({ message: 'Invalid! update a regiment' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}
const getAllWorkoutPlan = async (req, res) => {
    const { id } = req.params
    try {
        const exercise = await Exercise.findAll({ where: { TrainingDayId: id } })
        res.json(exercise)

    } catch (error) {
        error.details.push({ message: 'Invalid! Cannot get all Workouts' })
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
const getSingleWorkout = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await Exercise.findOne({ where: { id } })
        res.json(exercise)
    } catch (err) {
        error.details.push({ message: 'Invalid! cannot find workout with id' })
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}
const deleteWorkoutPlan = async (req, res) => {
    // Finds Regiment by PK
    const day = await Training_Day.findByPk(req.params.id)
    // if no regiment that return error 
    if (!day) {
        error.details.push({ message: 'Invalid! cannot find day by that ID' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    const exercises = await Exercise.findAll({ where: { TrainingDayId: day.id } })
    if (!exercises) {
        error.details.push({ message: 'Invalid! cannot find Days by that ID' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {
        try {
            // TODO:remove workout / exercise without affecting Training Day

            await Exercise.destroy({ where: { TrainingDayId: day.id } })
            res.status(200).json({ message: `Success! Delete from Workout - ${day.description}` })

        } catch (err) {
            error.details.push({ message: 'Invalid! Cannot delete regiment' })
            res.status(403).json({ errors: error.details.map(err => err.message) })
            error.details = []
        }
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