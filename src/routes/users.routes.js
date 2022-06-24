const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.post("/", (req, res) => {
  const { name, email, password } = req.body;

  res.send(`User: ${name}, email: ${email}, password: ${password}`);
});

module.exports = usersRoutes;
