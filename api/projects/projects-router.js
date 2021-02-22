// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const router = express.Router()
const {     validateProjectID, validateProject } = require("../middleware/middleware")

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.

router.get('/', (req, res, next) => {
    projects.get()
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})
// [GET] /api/projects/:id returns a project with the given id as the body of the response.

router.get('/:id', validateProjectID(), (req, res) => {
    res.json(req.project)
})
// [POST] /api/projects returns the newly created project as the body of the response.

router.post('/', validateProject(), (req, res, next) => {
    projects.insert(req.body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch(next)
})
// [PUT] /api/projects/:id returns the updated project as the body of the response.

router.put('/:id', validateProject(), validateProjectID(), (req, res, next) => {
    projects.update(req.params.id, req.body)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})
// [DELETE] /api/projects/:id returns no response body.

router.delete('/:id', validateProjectID(), (req, res, next) => {
    projects.remove(req.params.id)
    .then((count) => {
        if (count > 0){
            res.status(200).json(count)
        } else{
            res.status(404).json({
                message: "Project could not be removed"
            })
        }
    })
    .catch(next)
})

// [GET] /api/projects/:id/actions

router.get('/:id/actions/', validateProjectID(), (req, res, next) => {
    projects.getProjectActions(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

module.exports = router;