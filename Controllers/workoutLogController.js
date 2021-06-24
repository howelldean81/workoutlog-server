const Express = require("express")
const router = Express.Router()
const validateJWT = require("../middleware/validate-jwt")

// Import the Workout log model.
const { LogModel } = require("../models") //<--- insert
const Log = require("../models/log")

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
})

//============================//
//    Workout Log Create
//============================//

router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.Log
    const { id } = req.user
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry)
        res.status(200).json(newLog)
    } catch (err) {
        res.status(500).json({ error: err})
    }
    LogModel.create(logEntry)
})

// =============================
//     Get all workout logs 
// =============================

router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll()
        res.status(200).json(entries)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/about', (req, res) => {
    res.send('This is the about route!')
})

// ================================
//     Get workout logs by user
// ================================

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const userWorkoutlogs = await LogModel.findAll({
            where: {
                owner_id: id
            }
        })
        res.status(200).json(userWorkoutlogs)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router