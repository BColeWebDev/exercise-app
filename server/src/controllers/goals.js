const { Goal } = require("../models")

let error = { details: [] };
const getGoals = async (req, res) => {
    const { id } = req.body
    try {
        const goal = await Goal.findAll({ where: { regimentId: { id } } })
        res.status(200).json(goal)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
const createGoal = async (req, res) => {
    try {
        const goal = await Goal.create(req.body)
        res.status(200).json(goal)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
const updateGoal = async (req, res) => {
    const { id } = req.params
    try {
        const goal = await Goal.update(req.body, { where: { id } })
        res.status(200).json(goal)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const deleteGoal = async (req, res) => {
    const { id } = req.params
    try {
        const goal = await Goal.destroy({ where: { id } })
        res.status(200).json(goal)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
module.exports = { createGoal, updateGoal, getGoals, deleteGoal }