const express = require("express")
const router = express.Router()
const exercisesCtrl = require("../controllers/exercises")
const { exerciseIsValid } = require("../middleware/validation")

// Exercises Routes

// GET - Get All Regiments
// GET Get all Body Parts
// GET - Get a Single Body Part
// GET - Get all MuscleGroup
// GET - Get Single Muscle Group
// GET - Get All Equipments
// GET - Get Single Equipment
// GET - Get By Name

router.route("/")
    .get(exercisesCtrl.getAllExercises)


router.route('/targets')
    .get(exercisesCtrl.getAllBodyParts)
router.route("/targets/:name")
    .get(exercisesCtrl.getSingleBodyPart)


router.route("/muscles")
    .get(exercisesCtrl.getAllMuscleGroups)
router.route("/muscles/:name")
    .get(exercisesCtrl.getSingleMuscleGroup)


router.route("/equipments")
    .get(exercisesCtrl.getAllEquipments)
router.route("/equipments/:name")
    .get(exercisesCtrl.getSingleEquipment)


router.route('/name')
    .get(exercisesCtrl.getByName)

// Plans Route - Creating workout plans 

// GET  - Get all Workout Plans
// POST - Create Workout Plans
// PUT - Update workout Plans
// DELETE - Delete workout plans

router.route('/plans/:id')
    .get(exercisesCtrl.getAllWorkoutPlan)
    .post(exerciseIsValid, exercisesCtrl.createWorkOutPlan)
    .put(exerciseIsValid, exercisesCtrl.updateWorkOutPlan)
    .delete(exercisesCtrl.deleteWorkoutPlan)

router.route("/plans/name/:id")
    .get(exercisesCtrl.getSingleWorkout)


module.exports = router