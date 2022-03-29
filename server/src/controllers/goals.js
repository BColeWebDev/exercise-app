const { Goal } = require("../models")

const getGoals = async (req, res) => {
    try {
        const goal = await Goal.findAll()
        res.json(goal)

    } catch (error) {
        res.json(error)
    }
}
const createGoal = async (req, res) => {
    try {
        const goal = await Goal.create(req.body)
    } catch (error) {
        res.json(error)
    }
}
const updateGoal = async (req, res) => {
    const { id } = req.params
    try {
        const goal = await Goal.update(req.body, { where: { id } })
        res.json(goal)
    } catch (error) {
        res.json(error)
    }
}

const deleteGoal = async (req, res) => {
    const { id } = req.params
    try {
        const goal = await Goal.destroy({ where: { id } })
        res.json(goal)
    } catch (error) {
        res.json(error)
    }
}
module.exports = { createGoal, updateGoal, getGoals, deleteGoal }