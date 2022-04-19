const { Regiment } = require("../models")
const { v4: uuidv4 } = require('uuid');

let error = { details: [] };
// Get All Regiments - for user
const getAllRegiments = async (req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        const regiment = await Regiment.findAll({ where: { userId: id } })
        res.json(regiment)
    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

const getRegimentById = async (req, res) => {
    const { id } = req.params
    try {
        const regiment = await Regiment.findByPk(id)
        res.json(regiment)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}
const updateRegiment = async (req, res) => {
    const { id } = req.params
    try {
        const regiment = await Regiment.update(req.body, {
            where: { id }
        })
        res.status(201).json(regiment)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }


}

const deleteRegiment = async (req, res) => {

    const { id } = req.params
    try {
        const regiment = await Regiment.destroy({
            where: { id }
        })
        res.status(200).json(regiment)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}
const createRegiment = async (req, res) => {

    //generate user id 
    const id = uuidv4()

    try {
        const regiment = await Regiment.create({ id, ...req.body })

        res.status(201).json(regiment)

    } catch (error) {
        res.status(400).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}
module.exports =
{
    getAllRegiments,
    getRegimentById,
    updateRegiment,
    deleteRegiment,
    createRegiment
}