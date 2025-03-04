// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next){
    try{
        const possible = await Action.get(req.params.id)
        if(possible) {
            req.action = possible
            next()
        } else {
            next({ status: 404, message: "action not found" })
        }
    }catch(err){
        next(err)
    }
}

function validateAction(req, res, next) {
    const {description, notes, completed, project_id} = req.body
    if(description === undefined|| project_id === undefined || completed === undefined || project_id === undefined|| notes === undefined){
        res.status(400).json({ message: "missing required description, notes and completed status" })
    }else{
        req.description = description
        req.notes = notes
        req.completed = completed
        req.project_id = project_id
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction
}