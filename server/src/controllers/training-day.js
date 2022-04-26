const { Training_Day, } = require("../models")
const { v4: uuidv4 } = require('uuid');

let error = { details: [] };
// Get All Training Days - for user
const getTrainingDays = async (req, res) => {

    const { id } = req.params
    const day = await Training_Day.findAll({ where: { regimentId: id } })


    // Sorts through Days
    const sorter = {
        // "sunday": 0, // << if sunday is first day of week
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6,
        "sunday": 7
    }

    let sorted = day.sort(function sortByDay(a, b) {
        let day1 = a.day.toLowerCase();
        let day2 = b.day.toLowerCase();
        return sorter[day1] - sorter[day2];
    });



    try {
        res.status(200).json(sorted)

    } catch (error) {
        error.details.push({ message: "Training Days cannot be Found! please try again" })

        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []

    }
}
const createTrainingDay = async (req, res) => {

    // Generates id
    const id = uuidv4()

    // if day already exist with that regiment Id
    // check to see if user already exist

    const dayExist = await Training_Day.findOne({ where: { day: req.body.day, RegimentId: req.body.RegimentId } })
    if (dayExist) {
        error.details.push({ message: "Day already exists!" })
        res.status(409).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {
        try {
            const day = await Training_Day.create({ id, ...req.body })
            res.status(200).json({ message: `Success! Day Created: ${day.day}` })
        } catch (err) {
            error.details.push({ message: "Training Day cannot be created! please try again" })
            res.status(400).json({ errors: error.details.map(err => err.message) })
            error.details = []
        }
    }

}
const updateTrainingDay = async (req, res) => {
    const { id } = req.params
    const { day, description, RegimentId } = req.body
    // check to see if day exists
    try {
        await Training_Day.update({ day, description }, { where: { id, regimentId: RegimentId } })
        res.status(200).json({ message: `Success! Day updated: ${day}` })
    } catch (err) {
        error.details.push({ message: "Training Day cannot be updated! please try again" })
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const deleteTrainingDay = async (req, res) => {
    const { id } = req.params
    try {
        const day = await Training_Day.destroy({ where: { id } })
        res.status(200).json({ message: `Success! Day Deleted ` })
    } catch (err) {
        error.details.push({ message: "Training Day cannot be deleted! please try again" })

        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}


const getTrainingDayById = async (req, res) => {
    const { id } = req.params
    const regiment = await Training_Day.findByPk(id)
    if (regiment === null) {
        error.details.push({ message: "Training Day cannot be located!" })
        res.status(404).json({ errors: error.details.map(err => err.message) })
        error.details = []

    } else {
        try {
            res.status(200).json(regiment)
        } catch (err) {
            error.details.push({ message: "Training Day cannot be deleted! please try again" })
            res.status(400).json(error)

        }
    }

}
module.exports = { createTrainingDay, updateTrainingDay, getTrainingDays, deleteTrainingDay, getTrainingDayById }