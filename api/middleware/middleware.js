const actions = require("../actions/actions-model")
const projects = require("../projects/projects-model")

function validateActionID() {
    return (req,res,next) => {
        actions.get(req.params.id)
        .then((action) => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(404).json({
                    message: "Action not found"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error rerieving action"
            })
        })
    }
}

function validateAction() {
    return (req, res, next) => {
        if(!req.body){
            return res.status(400).json({
                message: "Missing action data"
            })
        }
        if (!req.body.description){
            return res.status(400).json({
                message:"Missing description"
            })
        }
        if (!req.body.notes){
            return res.status(400).json({
                message:"Missing notes"
            })
        }
        next()
    }
}

function validateProjectID() {
    return (req, res, next) => {
        projects.get(req.params.id || req.body.project_id)
        .then((project) => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(400).json({
                    message: "Project not found"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error retrieving project"
            })
        })
    }
}

function validateProject(){
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "Missing project data"
            })
        }
        if (!req.body.name) {
            return res.status(400).json({
                message: "Missing project name"
            })
        }
        if (!req.body.description) {
            return res.status(400).json({
                message: "Missing project description"
            })
        }
        next()
    }
    
}

module.exports= {
    validateActionID,
    validateAction,
    validateProjectID,
    validateProject
}