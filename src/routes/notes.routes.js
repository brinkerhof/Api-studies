const { Router } = require("express");

const NotesControllers = require("../controllers/NotesController");

const notesRoutes = Router();

const notesController = new NotesControllers();

notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.post("/:id_user", notesController.create);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
