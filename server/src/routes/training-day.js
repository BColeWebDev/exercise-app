const express = require("express")
const router = express.Router()
const trainingCtrl = require("../controllers/training-day")
const { DayIsValid } = require('../middleware/validation')

// Regiment Routes

// GET - Get All Training Days (Monday, Tues, Wedensday etc....)
// POST Create a Training day (create a that DOES NOT exist for that specific regiment)
// PUT - Update a goal (update day that does exist)
// DELETE - Delete a goal (delete day that does exist)

router.route('/:id')
    .get(trainingCtrl.getTrainingDays)
    .post(DayIsValid, trainingCtrl.createTrainingDay)
    .put(DayIsValid, trainingCtrl.updateTrainingDay)
    .delete(trainingCtrl.deleteTrainingDay)

router.route('/name/:id')
    .get(trainingCtrl.getTrainingDayById)



module.exports = router