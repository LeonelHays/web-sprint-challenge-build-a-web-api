const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router')
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router')
// Do NOT `server.listen()` inside this file!
server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>LET'S GOOOOOO!</h1>`)
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})

module.exports = server;
