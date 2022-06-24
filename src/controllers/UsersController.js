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

    res.send(`User: ${name}, email: ${email}, password: ${password}`);
  }
}

module.exports = UsersControllers;
