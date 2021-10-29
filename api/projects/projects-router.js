// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const router = express.Router();

const { validateProjectId, validateProject } = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
});

router.get('/:id', validateProjectId ,(req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})

router.post('/', validateProject ,(req, res, next) => {
    Projects.insert(req.body)
        .then(newProjects => {
            res.status(201).json(newProjects)
        })
        .catch(next)
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(201).json(updatedProject)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(req.projects)
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
        const action = await Projects.getProjectActions(req.params.id)
        res.json(action)
    }catch(err){
        next(err)
    }
})

module.exports = router