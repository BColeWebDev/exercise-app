const { Regiment, Training_Day } = require("../models")
const { v4: uuidv4 } = require('uuid');

let error = { details: [] };
// Get All Regiments - for user
const getAllRegiments = async (req, res) => {
    const { id } = req.params
    const regiment = await Regiment.findAll({ where: { userId: id } })
    try {
        res.json(regiment)
    } catch (error) {
        error.details.push({ message: 'Invalid! Cannot get all regiments' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
}

// Get Regiment By ID 
const getRegimentById = async (req, res) => {
    const { id } = req.params
    try {
        const regiment = await Regiment.findByPk(id)
        res.json(regiment)

    } catch (err) {
        error.details.push({ message: 'Invalid! cannot regiment' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }

}

const updateRegiment = async (req, res) => {
    const { id } = req.params
    const { name, description, UserId } = req.body
    console.log(id)
    try {
        await Regiment.update({ name, description }, {
            where: { id, UserId }
        })
        res.status(200).json({ message: `Success! Updated ${name}` })

    } catch (err) {
        error.details.push({ message: 'Invalid! update a regiment' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }


}

// 
const deleteRegiment = async (req, res) => {
    // Finds Regiment by PK
    const regiment = await Regiment.findByPk(req.params.id)

    // if no regiment that return error 
    if (!regiment) {
        error.details.push({ message: 'Invalid! cannot find Regiment by that ID' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    const days = await Training_Day.findAll({ where: { regimentId: regiment.id } })
    if (!days) {
        error.details.push({ message: 'Invalid! cannot find Days by that ID' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
        error.details = []
    }
    else {
        try {
            // Removes all regiments base off the regimentID
            await Training_Day.destroy({ where: { regimentId: regiment.id } })
            await Regiment.destroy({ where: { id: regiment.id } })

            res.status(200).json({ message: `Success! Delete ${regiment.name}` })

        } catch (err) {
            res.json(err)
            error.details.push({ message: 'Invalid! Cannot delete regiment' })
            res.status(403).json({ errors: error.details.map(err => err.message) })
            error.details = []

        }
    }
}


const createRegiment = async (req, res) => {
    //Generate user id 
    const id = uuidv4()
    try {
        const regiment = await Regiment.create({ id, ...req.body })
        res.status(200).json({ message: `Success! Regiment Created: ${regiment.name}` })
    } catch (err) {
        error.details.push({ message: 'Invalid! Cannot delete regiment' })
        res.status(403).json({ errors: error.details.map(err => err.message) })
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