const { Router } = require("express");

const notesRoutes = require("./notes.routes");

const routes = Router();

routes.use("/notes", notesRoutes);

module.exports = routes;
