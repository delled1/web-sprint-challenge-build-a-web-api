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
// [DELETE] /api/projects/:id returns no response body.

module.exports = router;