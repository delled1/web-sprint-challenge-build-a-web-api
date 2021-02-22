// Write your "actions" router here!

const express = require('express')
const actions = require("./actions-model")
const router = express.Router()
const { validateActionID, validateAction } = require("../middleware/middleware")


// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.

router.get('/', (req, res, next) => {
    actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch(next)
})


// [GET] /api/actions/:id returns an action with the given id as the body of the response.

router.get('/:id', validateActionID(), (req,res, ) => {
    actions.get(req.params.id) 
    .then((action) => {
        if(action) {
            res.status(200).json(action)
        } else{
            res.status(404).json({
                message: "Could not find project"
            })
        }
    })
    // .catch(next)
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

router.put('/:id', validateAction(), validateActionID(), (req, res, next) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        if (action) {
            res.status(200).json(action)
        } else{ 
            res.status(404).json({
                message: "The action cound not be found"
            })
        }
    })
    .catch(next)
})
// [DELETE] /api/actions/:id returns no response body.

router.delete('/:id', validateActionID(), (req, res, next) => {
    actions.remove(req.params.id)
    .then((count) => {
        if (count > 0){
            res.status(200).json(count)
        } else{
            res.status(404).json({
                message: "Action could not be removed"
            })
        }
    })
    .catch(next)
})

module.exports = router;