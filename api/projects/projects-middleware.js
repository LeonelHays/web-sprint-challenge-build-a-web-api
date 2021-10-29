// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try{
        const possible = await Projects.get(req.params.id)
        if(possible) {
            req.projects = possible
            next()
        } else {
            next({ status: 404, message: 'project not found' })
        }
    }catch (err) {
        next(err)
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if(!name, !description, !completed){
        res.status(400).json({ message: "missing reqired name, description and completed status" })
    }else{
        req.name = name
        req.description = description
        req.completed = completed
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject
}