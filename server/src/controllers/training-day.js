const { Training_Day, Exercise } = require("../models")
const { v4: uuidv4 } = require('uuid');


const getTrainingDays = async (req, res) => {
    try {
        const day = await Training_Day.findAll({ include: Exercise })
        res.json(day)

    } catch (error) {
        res.json(error)
    }
}
const createTrainingDay = async (req, res) => {
    // Generates id
    const id = uuidv4()
    try {
        const day = await Training_Day.create({ id, ...req.body })
        res.json(day)
    } catch (error) {
        res.json(error)
    }
}
const updateTrainingDay = async (req, res) => {
    const { id } = req.params
    try {
        const day = await Training_Day.update(req.body, { where: { id } })
        res.json(day)
    } catch (error) {
        res.json(error)
    }
}

const deleteTrainingDay = async (req, res) => {
    const { id } = req.params
    try {
        const day = await Training_Day.destroy({ where: { id } })
        res.json(day)
    } catch (error) {
        res.json(error)
    }
}
module.exports = { createTrainingDay, updateTrainingDay, getTrainingDays, deleteTrainingDay }