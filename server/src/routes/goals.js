const express = require("express")
const router = express.Router()
const goalsCtrl = require("../controllers/goals")

// Regiment Routes

// GET  - Get all Workout Plans (user ID)
// POST - Create Workout Plans  (user ID)
// PUT - Update workout Plans   (user ID)
// DELETE - Delete workout plans (user ID)

router.route('/:id')
    .get(goalsCtrl.getGoals)
    .post(goalsCtrl.createGoal)
    .put(goalsCtrl.updateGoal)
    .delete(goalsCtrl.deleteGoal)



module.exports = router