const knex = require("../database/knex");

class NotesControllers {
  /**
   * index - GET para listar varios registros.
   * show - GET para exibir um registro especifico
   * create - POST para criar um registro
   * update - PUT para atualizar um registro
   * delete - DELETE para remover um registro
   */

  async index(req, res) {
    const { id_user, title, tags } = req.query;

    let notes;
    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.id_user"])
        .where("notes.id_user", id_user)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.id_note");
    } else if (title) {
      notes = await knex("notes")
        .where({ id_user })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    } else {
      notes = await knex("notes").where({ id_user });
    }

    const userTags = await knex("tags").where({ id_user });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.id_note === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return res.json(notesWithTags);
  }

  async show(req, res) {
    const { id } = req.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ id_note: id }).orderBy("name");
    const links = await knex("links")
      .where({ id_note: id })
      .orderBy("created_at");

    return res.json({
      ...note,
      tags,
      links,
    });
  }

  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { id_user } = req.params;

    const id_note = await knex("notes").insert({
      title,
      description,
      id_user,
    });

    const linksInsert = links.map((link) => {
      return {
        id_note,
        url: link,
      };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        id_note,
        name,
        id_user,
      };
    });

    await knex("tags").insert(tagsInsert);

    res.json();
  }

  async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;

    await knex("notes").where({ id }).delete();

    return res.json({ message: "Deleted" });
  }
}

module.exports = NotesControllers;
