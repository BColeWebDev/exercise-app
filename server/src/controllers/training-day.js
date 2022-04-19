const { Training_Day, } = require("../models")
const { v4: uuidv4 } = require('uuid');

let error = { details: [] };
const getTrainingDays = async (req, res) => {
    const { id } = req.body
    try {
        const day = await Training_Day.findAll({ where: { regimentId: id } })
        res.status(200).json(day)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []

    }
}
const createTrainingDay = async (req, res) => {
    // Generates id
    const id = uuidv4()

    // if day already exist 
    // check to see if user already exist
    const dayExist = await Training_Day.findOne({ where: { day: req.body.day } })
    if (dayExist) {
        error.details.push({ message: "Day already exists!" })
        res.status(409).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {
        try {
            const day = await Training_Day.create({ id, ...req.body })
            res.status(200).json(day)
        } catch (error) {
            res.status(400).json({ errors: error.details.map(err => err.message) })
            error.details = []
        }
    }

}
const updateTrainingDay = async (req, res) => {
    const { id } = req.params
    try {
        const day = await Training_Day.update(req.body, { where: { id } })
        res.status(200).json(day)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const deleteTrainingDay = async (req, res) => {
    const { id } = req.params
    try {
        const day = await Training_Day.destroy({ where: { id } })
        res.json(day)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
module.exports = { createTrainingDay, updateTrainingDay, getTrainingDays, deleteTrainingDay }