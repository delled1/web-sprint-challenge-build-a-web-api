const express = require('express');
const server = express();
const actionsRouter = require("../api/actions/actions-router")
const projectsRouter = require("../api/projects/projects-router")
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())

server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)
server.get('/', (req, res) => {
    res.send(`<h2>Sprint 1</h2>`);
  });
server.use((err, req, res) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong"
  })
})

module.exports = server;
