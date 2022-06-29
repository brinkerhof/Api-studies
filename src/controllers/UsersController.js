const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersControllers {
  /**
   * index - GET para listar varios registros.
   * show - GET para exibir um registro especifico
   * create - POST para criar um registro
   * update - PUT para atualizar um registro
   * delete - DELETE para remover um registro
   */
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Esse email ja existe");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email } = req.body;

    const { id } = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("User do not exists");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError("This email already exists");
    }

    user.name = name;
    user.email = email;

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ? WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return res.json();
  }
}

module.exports = UsersControllers;
