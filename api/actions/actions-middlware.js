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
    if(!description, !project_id, !notes, !completed){
        res.status(400).json({ message: "missing required description, notes and completed status" })
    }else{
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction
}