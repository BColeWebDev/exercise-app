const express = require("express")
const router = express.Router()
const regiments = require("../controllers/regiments")
const { regimentIsValid } = require("../middleware/validation")

// Regiment Routes

// GET - Get All Regiments
// GET Get Exercise by ID
// POST - Create a regiment
// PUT - Update a regiment
// DELETE - Delete a Regiment

router.route("/")
    .get(regiments.getAllRegiments)
    .post(regimentIsValid, regiments.createRegiment)

router.route("/:id")
    .get(regiments.getRegimentById)
    .put(regimentIsValid, regiments.updateRegiment)
    .delete(regiments.deleteRegiment)

module.exports = router