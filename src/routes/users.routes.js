const { Router } = require("express");

const UsersControllers = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersControllers();

usersRoutes.get("/", usersController.index);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
