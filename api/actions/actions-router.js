// Write your "actions" router here!

const express = require('express')
const actions = require("./actions-model")
const router = express.Router()
const { validateActionID, validateAction,  } = require("../middleware/middleware")


// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.

router.get('/', (req, res, next) => {
    actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch(next)
})


// [GET] /api/actions/:id returns an action with the given id as the body of the response.

router.get('/:id', validateActionID(), (req,res) => {

    res.json(req.action)
})

// [POST] /api/actions returns the newly created action as the body of the response.

router.post('/', validateAction(), (req, res, next) => {
    
    actions.insert(req.body)
    .then((action) => {
        res.status(201).json(action)
    })
    .catch(next)
})
// [PUT] /api/actions/:id returns the updated action as the body of the response.
// [DELETE] /api/actions/:id returns no response body.

module.exports = router;