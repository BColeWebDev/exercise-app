const express = require("express")
const router = express.Router()
const goalsCtrl = require("../controllers/goals")

// Regiment Routes

// GET - Get All Goals
// POST Create a Goal 
// PUT - Update a goal
// DELETE - Delete a goal

router.route('/')
    .get(goalsCtrl.getGoals)
    .post(goalsCtrl.createGoal)
    .put(goalsCtrl.updateGoal)
    .delete(goalsCtrl.deleteGoal)


module.exports = router