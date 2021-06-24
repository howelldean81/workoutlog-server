const Express = require("express")
const router = Express.Router()
const validateJWT = require("../middleware/validate-jwt")

// Import the Workout log model.
const { LogModel } = require("../models") //<--- insert

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

router.get('/about', (req, res) => {
    res.send('This is the about route!')
})

module.exports = router