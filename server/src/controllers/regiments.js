const { Regiment, Training_Day } = require("../models")
const { v4: uuidv4 } = require('uuid');


// get all regiments 
const getAllRegiments = async (req, res) => {
    try {
        const regiment = await Regiment.findAll({ include: Training_Day })
        res.json(regiment)
    } catch (error) {
        res.json(error)
    }
}

const getRegimentById = async (req, res) => {
    const { id } = req.params
    try {
        const regiment = await Regiment.findByPk(id)
        res.json(regiment)

    } catch (error) {
        res.json(error)
    }

}
const updateRegiment = async (req, res) => {
    const { id } = req.params
    try {
        const regiment = await Regiment.update(req.body, {
            where: { id }
        })
        res.json(regiment)

    } catch (error) {
        res.json(error)
    }


}

const deleteRegiment = async (req, res) => {

    const { id } = req.params
    try {
        const regiment = await Regiment.destroy({
            where: { id }
        })
        res.json(regiment)

    } catch (error) {
        res.json(error)
    }

}
const createRegiment = async (req, res) => {

    //generate user id 
    const id = uuidv4()

    try {
        const regiment = await Regiment.create({ id, ...req.body })

        res.status(200).json(regiment)

    } catch (error) {
        res.status(400).json(error)
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