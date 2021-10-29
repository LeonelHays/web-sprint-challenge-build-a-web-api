// Write your "actions" router here!
const express = require('express')
const { validateActionId, validateAction } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId ,(req, res) => {
    res.json(req.action)
})

router.post('/', validateAction ,(req, res, next) => {
    Actions.insert({ description: req.description,
    notes: req.notes, completed: req.completed, project_id: req.project_id })
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, { description: req.description,
        notes: req.notes, completed: req.completed, project_id: req.project_id })
        .then(() => {
            return Actions.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id)
        res.json(req.action)
    }catch(err){
        next(err)
    }
})

module.exports = router