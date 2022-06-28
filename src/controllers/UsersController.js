const AppError = require("../utils/AppError");

class UsersControllers {
  /**
   * index - GET para listar varios registros.
   * show - GET para exibir um registro especifico
   * create - POST para criar um registro
   * update - PUT para atualizar um registro
   * delete - DELETE para remover um registro
   */
  create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError("Name é obrigatorio");
    }

    res.status(201).json({ name: name, email: email, password: password });
  }
}

module.exports = UsersControllers;
